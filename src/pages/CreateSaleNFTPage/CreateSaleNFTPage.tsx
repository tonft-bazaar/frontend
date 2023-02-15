import { Dialog } from '@headlessui/react';
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BlueButton, GrayBtnWide } from '../../components/Buttons/Buttons';
import Header from '../../components/Header/Header';
import { PutOnSaleNFTModal } from '../../components/Modal/PutOnSaleNFTModal/PutOnSaleNFTModal';
import { BoldInterText } from '../../components/Texts/MainTexts';
import UserContext from '../../state/userState';
import { GradientBackground } from '../BasePage/BasePageStyles';
import { MyNFTSPageContainer } from '../MyNFTSPage/MyNFTSPageStyles';
import { BuyNFTImage, BuyNFTPageWrapper, CrossedMediumText, InfoContainer, InfoContainerTitle, InfoPointSubtitle, InfoPointTitle, InfoPointWrapper, PriceContainer, PriceMediumText, PriceWrapper, TextInDollars } from './CreateSaleNFTPageStyles';


export interface CreateSaleNFTPageProps { }

const CreateSaleNFTPage = ({} : CreateSaleNFTPageProps) => {  
    const { t, i18n } = useTranslation(); 
    const isMobile = window.innerWidth < 768;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const userContext = useContext(UserContext);
    const nft = userContext.userState.nft;
    const nftAddress = toUserFriendlyAddress(nft.address);
    const nftAddressShort = nftAddress.slice(0, 3) + '...' + nftAddress.slice(-3);
    const ownerAddress = toUserFriendlyAddress(nft.owner.address);
    const ownerAddressShort = ownerAddress.slice(0, 3) + '...' + ownerAddress.slice(-3);
    // console.log(userContext.userState.nft)

    return (
        <MyNFTSPageContainer>
            <Dialog className={`w-screen h-screen absolute bg-black bg-opacity-50 top-0 flex justify-center items-center`} open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
            {/* <Dialog className={`w-screen h-screen ${!isMobile && "w-[100%] h-[85rem]"} absolute bg-black bg-opacity-50 top-0 flex justify-center items-center`} open={modalIsOpen} onClose={() => setModalIsOpen(false)}> */}
				<PutOnSaleNFTModal 
                    close={() => setModalIsOpen(false)}
                    nftItemAddress={nftAddress}
                    ownerAddress={ownerAddress}
                />
			</Dialog>
            <BuyNFTPageWrapper>
                <GradientBackground/>
                <Header width="100%"/>
                <BuyNFTImage src={nft.metadata.image} alt="No image found" />
                <BlueButton disabled={nft.sale ? true : false} onClick={() => setModalIsOpen(true)}>{!nft.sale ? t("createSalePage.putOnSaleBtn") : t("createSalePage.alredyOnSaleBtn")}</BlueButton>
                <InfoContainer>
                    <InfoContainerTitle>{t("createSalePage.info")}</InfoContainerTitle>
                    <InfoPointWrapper>
                        <InfoPointTitle>{t("createSalePage.name")}</InfoPointTitle>
                        <InfoPointSubtitle >{nft.metadata?.name ? nft.metadata?.name : "Untitled"}</InfoPointSubtitle>
                    </InfoPointWrapper>
                    <InfoPointWrapper>
                        <InfoPointTitle>{t("createSalePage.collection")}</InfoPointTitle>
                        <InfoPointSubtitle>{nft.collection?.name ? nft.collection?.name : "Untitled"}</InfoPointSubtitle>
                    </InfoPointWrapper>
                    <InfoPointWrapper>
                        <InfoPointTitle>{t("createSalePage.ownerAddress")}</InfoPointTitle>
                        <a target="_blank" href={`https://tonscan.org/address/${ownerAddress}`}><InfoPointSubtitle link={true} >{ownerAddressShort}</InfoPointSubtitle></a>
                    </InfoPointWrapper>
                    <InfoPointWrapper>
                        <InfoPointTitle >{t("createSalePage.nftAddress")}</InfoPointTitle>
                        <a href={`https://tonscan.org/nft/${nftAddress}`} target="_blank"><InfoPointSubtitle link={true}>{nftAddressShort}</InfoPointSubtitle></a>
                    </InfoPointWrapper>
                </InfoContainer>
            </BuyNFTPageWrapper>

        </MyNFTSPageContainer>
    )
}

export default CreateSaleNFTPage;