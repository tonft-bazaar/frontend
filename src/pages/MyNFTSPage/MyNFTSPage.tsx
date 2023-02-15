import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import LoadingComponent from '../../components/LodingComponent/LoadingComponent';
import MenuComponent from '../../components/Menu/Menu';
import NFTCard from '../../components/NFTCard/NFTCard';
import { RegularInterText } from '../../components/Texts/MainTexts';
import { connector } from '../../connector';
import UserContext from '../../state/userState';
import { BasePageContainer, GradientBackground, NavTextsWrapper, NavText, BasePageTitle, BasePageSubtitle, ItemsWrapper } from '../BasePage/BasePageStyles';
import { MyNFTSPageContainer } from './MyNFTSPageStyles';


export interface MyNFTSPageProps { }

const MyNFTSPage = ({} : MyNFTSPageProps) => {   
    const { t, i18n } = useTranslation();  
    const userContext = useContext(UserContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<any>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const address = connector.wallet?.account.address;
            // console.log(address)
            setLoading(true);
            // const res = await axios.get('https://tonapi.io/v1/nft/searchItems?owner=EQDsP4js-X1VVS7mBZAuoeXvKcvOYlkpsdELBHwJOez07ZTW&collection=EQAG2BH0JlmFkbMrLEnyn2bIITaOSssd4WdisE4BdFMkZbir&include_on_sale=true&limit=100&offset=0');
            const res = await axios.get(`https://api.tonft.app/apiv1/getUserNfts?userAddress=${address}`);
            console.log(res.data);
            setItems(res.data.nfts);
            setLoading(false);

        }
        fetchData();
    }, []);

    if(loading) return <LoadingComponent/>
    
    return (
        <BasePageContainer>
            <GradientBackground/>
            <Header/>
            <NavTextsWrapper>
                <NavText active={false} onClick={() => navigate("/")}>{t("myNFTSPage.market")}</NavText>
                <NavText active={true}>{t("myNFTSPage.mynfts")}</NavText>
            </NavTextsWrapper>
            {/* <MenuComponent/> */}
            <ItemsWrapper>
                { items 
                    ? 
                        items.map((item: any, index: number) => {
                            // console.log(item.metadata.image)
                            return (
                                <NFTCard
                                    onClick={() => {
                                        userContext.userDispatch({ type: 'createSale', payload: item })
                                        navigate(`/create-sale`)}
                                    }
                                    key={index}
                                    nftName={item.metadata?.name ? item.metadata?.name : "Untitled"}
                                    nftPrice={"30"}
                                    url={item.metadata.image}
                                    myNFT={true}
                                    collectionName={item.collection?.name ? item.collection?.name : "No Collection Name"}
                                />
                            )
                        }) 
                    : 
                        <RegularInterText>{t("myNFTSPage.notFound")}</RegularInterText>
                }
            </ItemsWrapper>
        </BasePageContainer>
    )
}

export default MyNFTSPage;