import React from 'react';
import { CardImage, CardSubtitle, CardTitle, CardWrapper, CollectionNameText, PriceWithoutDiscount, PriceWrapper } from './NFTCardStyles';
import DefaultImage from  "../../assets/pictures/noImg.png"
import ImageLoading from  "../../assets/pictures/imgLoading.png"
// @ts-ignore
import LazyImage from "react-lazy-progressive-image";

export interface NFTCardProps {
    url: string;
    nftName: string;
    nftPrice: string;
    onClick: () => void;
    myNFT?: boolean;
    collectionName?: string;
}

const NFTCard = ({ url, nftName, nftPrice, onClick, myNFT, collectionName } : NFTCardProps) => {    
    const nftPriceWithoutDiscount = (parseFloat(nftPrice) * 1.1).toFixed(2);
    const collectionNameAdjusted = collectionName?.length! > 13 ?  `${collectionName?.slice(0,13)}...` : collectionName;
    const nftNameAdjusted = nftName.length! > 13 ?  `${nftName.slice(0,13)}...` : nftName;
    return (
        <CardWrapper onClick={onClick}>
            <LazyImage
                placeholder={ImageLoading}
                src={url}
            >
                {(src: any) => (
                    <CardImage  
                        src={src} 
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = DefaultImage ;
                        }}
                        alt="No Image Found"
                    />

                )}
            </LazyImage>
            <CardTitle>{nftNameAdjusted}</CardTitle>
            { myNFT && <CollectionNameText>{collectionNameAdjusted}</CollectionNameText>}
            { !myNFT && (
                <>  
                    <PriceWithoutDiscount>{parseFloat(nftPriceWithoutDiscount) > 1000 ? parseFloat(nftPriceWithoutDiscount).toFixed(0) :  parseFloat(nftPriceWithoutDiscount).toFixed(2)} TON</PriceWithoutDiscount>
                    <CardSubtitle>{parseFloat(nftPrice) > 1000 ? parseFloat(nftPrice).toFixed(0)  : parseFloat(nftPrice).toFixed(2)} TON</CardSubtitle>
                </>
            )}

        </CardWrapper>
    )
}

export default NFTCard;