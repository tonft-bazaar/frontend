import { toUserFriendlyAddress } from '@tonconnect/sdk';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfoContainerTitle, InfoPointWrapper, InfoPointTitle, InfoPointSubtitle, InfoContainer } from './BuyNFTPageStyles';


export interface InfoContainerCompProps {
    nftTonApi: any;
    offer: any;
    formatAddress: (address: string) => string;
}

const InfoContainerComp = ({
    nftTonApi,
    offer,
    formatAddress
} : InfoContainerCompProps) => {   
    const { t, i18n } = useTranslation();  
    
    return (
        <InfoContainer>
            <InfoContainerTitle>{t("buyPage.info")}</InfoContainerTitle>
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.name")}</InfoPointTitle>
                <InfoPointSubtitle>{nftTonApi.metadata?.name ? nftTonApi.metadata?.name : "Untitled"}</InfoPointSubtitle>
            </InfoPointWrapper>
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.collection")}</InfoPointTitle>
                <InfoPointSubtitle>{nftTonApi.collection?.name ? nftTonApi.collection?.name : "Untitled"}</InfoPointSubtitle>
            </InfoPointWrapper>
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.nftAddress")}</InfoPointTitle>
                
                <a 
                    href={`https://tonscan.org/nft/${offer.nftitemaddress}`} 
                    target="_blank"
                >   
                    <InfoPointSubtitle 
                        link={true}
                    >
                        {formatAddress(offer.nftitemaddress)}
                    </InfoPointSubtitle>
                </a>
            </InfoPointWrapper>
            { nftTonApi.collection?.address && 
                <InfoPointWrapper>
                    <InfoPointTitle>{t("buyPage.collectionAddress")}</InfoPointTitle>
                    
                    <a 
                        href={`https://tonscan.org/address/${nftTonApi.collection?.address}`} 
                        target="_blank"
                    >   
                        <InfoPointSubtitle 
                            link={true}
                        >
                            {formatAddress(toUserFriendlyAddress(nftTonApi.collection?.address))}
                        </InfoPointSubtitle>
                    </a>
                </InfoPointWrapper>
            }
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.ownerAddress")}</InfoPointTitle>
                
                <a 
                    href={`https://tonscan.org/nft/${offer.owneraddress}`} 
                    target="_blank"
                >   
                    <InfoPointSubtitle 
                        link={true}
                    >
                        {formatAddress(offer.owneraddress)}
                    </InfoPointSubtitle>
                </a>
            </InfoPointWrapper>
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.saleAddress")}</InfoPointTitle>
                
                <a 
                    href={`https://tonscan.org/nft/${offer.contractaddress}`} 
                    target="_blank"
                >   
                    <InfoPointSubtitle 
                        link={true}
                    >
                        {formatAddress(offer.contractaddress)}
                    </InfoPointSubtitle>
                </a>
            </InfoPointWrapper>
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.nftVerified")}</InfoPointTitle>
                    <InfoPointSubtitle 
                    >
                        {nftTonApi?.verified ? "✅" : "❌"}
                    </InfoPointSubtitle>
            </InfoPointWrapper>
        </InfoContainer>
    )
}

export default InfoContainerComp;