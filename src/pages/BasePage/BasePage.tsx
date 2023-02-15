import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import LoadingComponent from '../../components/LodingComponent/LoadingComponent';
import MenuComponent from '../../components/Menu/Menu';
import NFTCard from '../../components/NFTCard/NFTCard';
import { RegularInterText } from '../../components/Texts/MainTexts';
import { connector } from '../../connector';
import UserContext from '../../state/userState';
import { BasePageContainer, BasePageSubtitle, BasePageSubtitleTwo, BasePageTitle, GradientBackground, ItemsWrapper, NavText, NavTextsWrapper } from './BasePageStyles';
// @ts-ignore
import CryptoJS from "crypto-js";
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import { useTonWallet } from '../../hooks/useTonWallet';
import { useTranslation } from 'react-i18next';

export interface BasePageProps { }


const BasePage = ({} : BasePageProps) => { 
    const { t, i18n } = useTranslation(); 
    const userContext = useContext(UserContext);
    const [offers, setOffers] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<any>([]);
    const [ordersFromOurDb, setOrdersFromOurDb] = useState<any>([])
    const [sortBy, setSortBy] = useState< "PriceHigh" | "PriceLow" | "DateOld" | "DateNew" >("DateNew");
    const navigate = useNavigate();
    const wallet = useTonWallet();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            await axios.get(`https://api.tonft.app/apiv1/getAllOffers`)
                .then(function (res) {
                    console.log(res.data); 
                    // setItems(res.data.itemsData);
                    setItems(res.data.activeOrders);
                    console.log(res.data)
                    // loop through items and get the nft data 
                })
                .catch(function (error) {
                    console.log(error);
                })
          
            setLoading(false);
            
            // const res = await axios.get('https://tonapi.io/v1/nft/searchItems?owner=EQDsP4js-X1VVS7mBZAuoeXvKcvOYlkpsdELBHwJOez07ZTW&collection=EQAG2BH0JlmFkbMrLEnyn2bIITaOSssd4WdisE4BdFMkZbir&include_on_sale=true&limit=100&offset=0');
            // console.log(res.data.nft_items);
            // setItems(res.data.nft_items);
        }
        fetchData();
    }, []);

    if(loading) return <LoadingComponent/>
    
    return (
        <BasePageContainer>
            <GradientBackground/>
            <Header/>
            { connector.wallet 
                ?
                    (
                        <NavTextsWrapper>
                            <NavText active={true}>{t("mainPage.market")}</NavText>
                            <NavText onClick={() => navigate("/my-nfts")}  active={false}>{t("mainPage.mynfts")}</NavText>
                        </NavTextsWrapper>
                    )   
                : 
                    (
                        <>
                            <BasePageTitle>{t("mainPage.title")}</BasePageTitle>
                            {/* <BasePageSubtitle>{t("mainPage.offers")}</BasePageSubtitle> */}
                        </>
                    )
            }

            <BasePageSubtitleTwo>{t("mainPage.trending")}</BasePageSubtitleTwo>
            <ItemsWrapper>
                { items 
                    ? 
                        items.map((item: any, index: number) => {
                            if(!item.metadata) return;
                            if(item.collection.name !== "DeOS tokens") return
                            return (
                                <NFTCard
                                    onClick={() => {
                                        const text = { 
                                            ownerAddress: item.owneraddress,
                                            nftItemAddress: toUserFriendlyAddress(item.address)
                                         };
                       
                                        navigate(`/getOffer?owner=${text.ownerAddress}&nftItem=${text.nftItemAddress}`)
                                    }
                                    }
                                    key={index}
                                    nftName={item.metadata?.name ? item.metadata?.name : "Untitled"}
                                    nftPrice={item.price}
                                    url={item.metadata?.image ? item.metadata?.image : "Not Found"}
                                />
                            )
                        }) 
                    : 
                        <RegularInterText>No NFTs Found</RegularInterText>
                }
            </ItemsWrapper>
            <BasePageSubtitle>{t("mainPage.other")}</BasePageSubtitle>
            <MenuComponent setSortBy={setSortBy}/>
            <ItemsWrapper>
                { items 
                    ? 
                        items.sort((a: any, b: any) => {
                            // console.log(sortBy)
                            // console.log(a.price, b.price)
                            switch(sortBy) {
                                case "PriceHigh":
                                    return parseFloat(a.price) < parseFloat(b.price) ? 1 : -1;
                                case "PriceLow":
                                    return parseFloat(a.price) > parseFloat(b.price) ? 1 : -1;
                                case "DateOld":
                                    return a.createdat > b.createdat ? 1 : -1;
                                case "DateNew":
                                    return a.createdat < b.createdat ? 1 : -1;
                            }
                        }).map((item: any, index: number) => {
                            if(!item.metadata) return;
                            return (
                                <NFTCard
                                    onClick={() => {
                                        const text = { 
                                            ownerAddress: item.owneraddress,
                                            nftItemAddress: toUserFriendlyAddress(item.address)
                                         };
                       
                                        navigate(`/getOffer?owner=${text.ownerAddress}&nftItem=${text.nftItemAddress}`)
                                    }
                                    }
                                    key={index}
                                    nftName={item.metadata?.name ? item.metadata?.name : "Untitled"}
                                    nftPrice={item.price}
                                    url={item.metadata?.image ? item.metadata?.image : "Not Found"}
                                />
                            )
                        }) 
                    : 
                        <RegularInterText>No NFTs Found</RegularInterText>
                }
            </ItemsWrapper>
        </BasePageContainer>
    )
}

export default BasePage;