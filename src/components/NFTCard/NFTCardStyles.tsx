import styled from "styled-components";
import { BoldInterText, MediumInterText } from "../Texts/MainTexts";


export const CardWrapper  = styled.div`
    border: 1px solid #E5E8EB;
    padding-bottom: 1rem;
    /* height: 23.5rem; */
    width: 16.7rem;
    border-radius: 15px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 2.4rem;
    cursor: pointer;

    @media only screen and (min-width: 480px) {
        margin-right: 2.5rem;
    }
`

// export const CardImage = styled.div<{url: string}>`
//     background-image: url(url);
//     background-repeat: no-repeat;
//     background-size: contain;
//     background-position: center;
//     max-height: 13.4rem;
//     height: 10rem;
//     width: 10rem;
// `
export const CardImage = styled.img`
    object-fit: contain;
    max-height: 17rem;
    width: 100%;
    border-radius: 15px 15px 0 0;
`

export const CardTitle = styled(BoldInterText)`
    font-size: 1.6rem;
    color: #000;
    margin-top: 1.3rem;
    text-align: left;
    align-self: flex-start;
    margin-left: 1.5rem;
`

export const CardSubtitle = styled(CardTitle)`
     margin-top: 0.3rem;
`

export const CollectionNameText = styled(MediumInterText)`
    margin-top: 0.3rem;
    font-size: 1.6rem;
    color: #8A8A93;
    text-align: left;
    align-self: flex-start;
    margin-left: 1.5rem;
`

export const PriceWithoutDiscount = styled(CardTitle)`
    margin: 0;
    margin-left: 1.5rem;
    text-decoration: line-through;
    text-decoration-color: red;
    text-decoration-thickness: 1px;
    color: #999999;
    margin-top: 0.7rem;
`

export const PriceWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`