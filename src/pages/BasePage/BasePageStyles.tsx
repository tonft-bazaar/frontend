import styled from "styled-components";
import { BoldInterText } from "../../components/Texts/MainTexts";

export const BasePageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    /* align-self: center; */
    /* width: 90%; */

    @media only screen and (min-width: 480px) {
        width: 100%;
        max-width: 1520px;
    }  
`

export const GradientBackground = styled.div`
    background: linear-gradient(180.04deg, #FFFFFF 11.27%, rgba(228, 228, 228, 0.3) 68.11%, rgba(224, 224, 224, 0.6) 99.97%);
    width: 100vw;
    left: 0;
    right: 0;
    height: 100vh;
    position: fixed;
    z-index: -1000;
    /* bottom: 0; */
`
export const BasePageTitle = styled(BoldInterText)`
        color: #000;
        text-align: center;
        font-size: 3.2rem;
        width: 70%;
        margin-top: 3.5rem;
        margin-bottom: 5rem;

        @media only screen and (min-width: 480px) {
            margin-top: 14rem;
            width: 90%;
            text-align: start;
        }
`

export const BasePageSubtitle = styled(BoldInterText)`
        width: 90%;
        color: #000;
        align-self: center;
        text-align: start;
        font-size: 2.8rem;
        width: 90%;
        margin-top: 4rem;
        margin-bottom: 1.6rem;
`

export const BasePageSubtitleTwo = styled(BoldInterText)`
        width: 90%;
        color: #000;
        align-self: center;
        text-align: start;
        font-size: 2.8rem;
        width: 90%;
        /* margin-top: 4.7rem; */
        margin-bottom: 1.6rem;
`

export const ItemsWrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: ƒlex-start;
    justify-content: space-between;
    flex-wrap: wrap;

    @media only screen and (min-width: 480px) {
        justify-content: flex-start;
    }

`
export const NavTextsWrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    align-self: center;
    margin-top: 5.8rem;
    margin-bottom: 5.5rem;
`

export const NavText = styled(BoldInterText)<{active: boolean}>`
    font-size: 2.8rem;
    color: ${props => !props.active ? '#000' : '#0088CC'};
    margin-right: 4.3rem;
    cursor: pointer;
`



