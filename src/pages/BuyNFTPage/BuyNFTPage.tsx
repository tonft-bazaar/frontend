import React, { useContext, useEffect, useState } from 'react';
import { BlueButton } from '../../components/Buttons/Buttons';
import Header from '../../components/Header/Header';
import { BoldInterText } from '../../components/Texts/MainTexts';
import UserContext from '../../state/userState';
import { GradientBackground } from '../BasePage/BasePageStyles';
import { MyNFTSPageContainer } from '../MyNFTSPage/MyNFTSPageStyles';
import { BtnAndPriceWrapper, BuyNFTImage, BuyNFTPageContainer, BuyNFTPageWrapper, CrossedMediumText, ImageAndInfoWrapper, InfoContainer, InfoContainerTitle, InfoPointSubtitle, InfoPointTitle, InfoPointWrapper, PriceContainer, PriceMediumText, PriceWrapper, TextInDollars } from './BuyNFTPageStyles';
// @ts-ignore
import CryptoJS from "crypto-js";
import axios from 'axios';
import LoadingComponent from '../../components/LodingComponent/LoadingComponent';
import { connector } from '../../connector';
import { useNavigate } from 'react-router';
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import InfoContainerComp from './InfoContainer';
import { Dialog } from '@headlessui/react';
import { BuyNFTModal } from '../../components/Modal/Modal';
import { useTranslation } from 'react-i18next';
import DefaultImage from  "../../assets/pictures/noImg.png"
import NotFoundComponent from '../../components/NotFoundComp/NotFoundComp';
import { useTonWallet } from '../../hooks/useTonWallet';

export interface BuyNFTPageProps { }

const formatAddress = (nftAddress: string) => {
    return nftAddress.slice(0, 3) + '...' + nftAddress.slice(-3)
}

const BuyNFTPage = ({} : BuyNFTPageProps) => {  
    const { t, i18n } = useTranslation(); 
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const isMobile = window.innerWidth < 480;
    const navigate = useNavigate();
    const [offer, setOffer] = useState<any>();
    const [nftTonApi, setNftTonApi] = useState<any>();
    const [toncoinPrice, setToncoinPrice] = useState<any>();
    const [cancelLink, setCancelLink] = useState<string>("");
    const [buyLink, setBuyLink] = useState<string>("");
    const [isCanelModalOpen, setCancelModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const wallet = useTonWallet();

    const onBuy = () => {
        // const buyLink = `https://app.tonkeeper.com/transfer/${offer.contractaddress}?amount=${((offer.price) * 1000000000) + 1000000000}`
        // setBuyLink(buyLink)
        isMobile ? window.open(buyLink, '_blank') : setModalIsOpen(true);
    }

    const cancelOffer = () => {
        isMobile ? window.open(cancelLink, '_blank') : setCancelModalOpen(true);
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

		// check if url has data param
		const encryptedDataCheck = searchParams.has('owner');
        if (encryptedDataCheck) {
            // const encryptedData = decodeURIComponent(searchParams.get('data')!);
            // const encryptedData = decodeURIComponent(searchParams.get('data')!);
            // const bytes = CryptoJS.AES.decrypt(encryptedData, "abobaNFT228");
            // const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            // const ownerAddre = JSON.parse(searchParams.get('data')!);
            const data = {
                nftItemAddress: searchParams.get('nftItem')!,
                ownerAddress: searchParams.get('owner')!
            }

            // console.log(data)
            const fetchOffer = async () => {
                try {
                    setLoading(true)
                    const res = await axios.get(`https://api.tonft.app/apiv1/getOffer?nftItemAddress=${data.nftItemAddress}&ownerAddress=${data.ownerAddress}`);
                    const nftAddress = res.data.activeOrder.nftitemaddress;
                    const resTonApi = await axios.get(`https://tonapi.io/v1/nft/getItems?addresses=${nftAddress}`);
                    setNftTonApi(resTonApi.data.nft_items[0])
                    setOffer(res.data.activeOrder)
                    setCancelLink(res.data.cancelLink)
                    const toncoinData = await axios.get(` https://api.coingecko.com/api/v3/coins/the-open-network`);
                    setToncoinPrice(toncoinData.data.market_data.current_price.usd);
                    setBuyLink(res.data.buyLink);
                } catch (error) {
                    setError("Offer not found or sold");
                }

                setLoading(false);
            }
            fetchOffer();
            console.log(wallet);
        }
    }, [])
    // const userContext = useContext(UserContext);
    // const nft = userContext.userState.nft;
    // console.log(userContext.userState.nft)
    if(loading) return <LoadingComponent/>

    if(!offer && loading === false) return <NotFoundComponent/>

    return (
        <BuyNFTPageContainer>
            <BuyNFTPageWrapper>
                { isMobile 
                    ? 
                        <>
                            <GradientBackground/>
                            <Header width="100%"/>
                            <BuyNFTImage 
                                src={nftTonApi.metadata.image} 
                                alt="No Image Found" 
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = DefaultImage ;
                                }}
                            />
                            <PriceContainer>
                                <PriceMediumText>{t("buyPage.description")}</PriceMediumText>
                                <CrossedMediumText>{(parseFloat(offer.price) * 1.1).toFixed(2)} TON</CrossedMediumText>
                                <PriceWrapper>
                                    <BoldInterText color='#000' fontSize={2.4}>{offer.price} TON</BoldInterText>
                                    <TextInDollars>{(parseFloat(offer.price) * toncoinPrice).toFixed(2)} $</TextInDollars>
                                </PriceWrapper>
                            </PriceContainer>
                            {(connector.wallet && offer.owneraddress === toUserFriendlyAddress(connector.wallet?.account.address))  &&  <BlueButton onClick={() => cancelOffer()}>Cancel Offer</BlueButton>}
                            {(connector.wallet && offer.owneraddress !== toUserFriendlyAddress(connector.wallet?.account.address))  &&  <BlueButton onClick={() => onBuy()}>Buy</BlueButton>}
                            {!connector.wallet && <BlueButton onClick={() => onBuy()}>Buy</BlueButton>}
                            <InfoContainerComp
                                nftTonApi={nftTonApi}
                                offer={offer}
                                formatAddress={formatAddress}
                            />
                        </>
                    : 
                        <>  
                            <Dialog className={`w-full h-full  absolute bg-black bg-opacity-50 top-0 flex justify-center items-center`} open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                                <BuyNFTModal close={() => setModalIsOpen(false)} link={buyLink}/>
                            </Dialog>
                            <Dialog className={`w-full h-full  absolute bg-black bg-opacity-50 top-0 flex justify-center items-center`} open={isCanelModalOpen} onClose={() => setCancelModalOpen(false)}>
                                <BuyNFTModal close={() => setCancelModalOpen(false)} link={cancelLink}/>
                            </Dialog>
                            <GradientBackground/>
                            <Header width="100%"/>
                            <ImageAndInfoWrapper>
                                <BuyNFTImage 
                                    src={nftTonApi.metadata.image} 
                                    alt="No Image Found" 
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = DefaultImage ;
                                    }}
                                />
                                <InfoContainerComp
                                    nftTonApi={nftTonApi}
                                    offer={offer}
                                    formatAddress={formatAddress}
                                />
                            </ImageAndInfoWrapper>
                            <BtnAndPriceWrapper>
                                {(connector.wallet && offer.owneraddress === toUserFriendlyAddress(connector.wallet?.account.address))  &&  <BlueButton width='60rem' onClick={() => cancelOffer()}>{t("buyPage.cancelBtn")}</BlueButton>}
                                {(connector.wallet && offer.owneraddress !== toUserFriendlyAddress(connector.wallet?.account.address))  &&  <BlueButton width='60rem' onClick={() => onBuy()}>{t("buyPage.buyBtn")}</BlueButton>}
                                {!connector.wallet && <BlueButton width='60rem' onClick={() => onBuy()}>{t("buyPage.buyBtn")}</BlueButton>}
                                <PriceContainer>
                                    <PriceMediumText>{t("buyPage.description")}</PriceMediumText>
                                    <CrossedMediumText>{(parseFloat(offer.price) * 1.1).toFixed(2)} TON</CrossedMediumText>
                                    <PriceWrapper>
                                        <BoldInterText color='#000' fontSize={2.4}>{offer.price} TON</BoldInterText>
                                        <TextInDollars>{(parseFloat(offer.price) * toncoinPrice).toFixed(2)} $</TextInDollars>
                                    </PriceWrapper>
                                </PriceContainer>
                            </BtnAndPriceWrapper>
                        </>
                }
            </BuyNFTPageWrapper>
        </BuyNFTPageContainer>
    )
}

export default BuyNFTPage;