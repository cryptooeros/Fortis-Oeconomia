import { useSigningClient } from "../../contexts/cosmwasm";
import {
    convertMicroDenomToDenom,
    convertDenomToMicroDenom,
    convertMicroDenomToDenom2,
    convertDenomToMicroDenom2,
    convertFromMicroDenom
} from '../../util/conversion'
import InputWithIncDec from '../InputWithIncDec'
import styled from 'styled-components'
import { useContext } from 'react'
import { ToggleContext } from "../Layout/Layout";

const Wrapper = styled.div`
    padding: 50px 32px;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 2.74846px 5.49692px 57.0305px rgba(161, 164, 176, 0.25);
    border-radius: 15.1165px;
    display: flex;
    max-width: 770px;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const TotalStaked = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    border-right: 2.05843px solid #2E0752;
    padding-right: 40px;
    margin-right: 40px;
    @media (max-width: 768px) {
        padding-right: 0px;
        margin-right: 0px;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-right: 0px;
        border-bottom: 2.05843px solid #2E0752;
    }
`

const TotalStakedText = styled.label`
    width: unset !important;
    border-bottom: 0px !important;
    margin: 0 !important;
    font-size: 16px;
`

const StakedValue = styled.span`
    font-size: 16px;
    display: block;
    float: right;
`

const MyStaked = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1;
`

const MyStakedContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`

const MyStakedText = styled.label`
    width: 100% !important;
    border-bottom: 0px !important;
    margin: 0 !important;
`

const MaxButton = styled.button`
    margin-bottom: 20px;
    padding: 5px !important;
    width: 100px;
    min-width: unset !important;
`

const MyRewardsUp = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 56px;
    border-bottom: 2.05843px solid #2E0752;
`

const StakeNClaimSecond = ({
    handleBurnMinus,
    onBurnChange,
    handleBurnPlus,
    handleFotStaking,
    handleFotStakingUnstake,
    handleFotStakingClaimReward,
    from,
    to,
    APY,
}) => {
    const {
        fotTokenInfo,
        gfotTokenInfo,
        gfotStakingContractInfo,
        gfotStakingAmount,
        gfotStakingApy,
        gfotStakingMyStaked,
        gfotStakingMyReward,
        gfotBalance,
        handlegFotStakingChange,
    } = useSigningClient();
    const {toggle} = useContext(ToggleContext)
    return (
        <Wrapper>
            <TotalStaked>
                <div className="wallet-text w-full" style={{marginBottom: '28px', paddingBottom: '26px', borderBottom: '2.05843px solid #2E0752'}}>
                    <TotalStakedText className="wallet-label" style={{textAlign: 'center'}}>Total Stakes</TotalStakedText>
                    <TotalStakedText className="wallet-label">
                        {from}
                        <StakedValue>
                            {" "}
                            {0}
                        </StakedValue>
                    </TotalStakedText>
                    <TotalStakedText className="wallet-label" style={{fontSize:'18px'}}>
                        {to}
                        <StakedValue>
                            {" "}
                            {"0"}
                        </StakedValue>
                    </TotalStakedText>
                    <TotalStakedText className="wallet-label" style={{fontSize:'18px'}}>
                        APY
                        <StakedValue>
                            {" "}
                            {APY}
                        </StakedValue>
                    </TotalStakedText>
                </div>
                <div className='gFotCurrencyt-selection' style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', gap: '10px'}}>
                    <span className="wallet-label" style={{fontSize:'18px', height: 'unset'}}>{from}</span>
                    <InputWithIncDec
                        handleBurnMinus={handleBurnMinus}
                        burnAmount={gfotStakingAmount}
                        onBurnChange={onBurnChange}
                        handleBurnPlus={handleBurnPlus}
                    />
                </div>
                <div className='gFotCurrencyt-selection' style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', gap: '10px'}}>
                    <span className="wallet-label" style={{fontSize:'18px', height: 'unset'}}>{to}</span>
                    <InputWithIncDec
                        handleBurnMinus={handleBurnMinus}
                        burnAmount={gfotStakingAmount}
                        onBurnChange={onBurnChange}
                        handleBurnPlus={handleBurnPlus}
                        maxW="216px"
                    />
                </div>
                <button className={`default-btn ${!toggle && 'secondary-btn'}`} style={{marginTop: '28px'}} onClick={handleFotStaking}>Stake</button>
            </TotalStaked>
            <MyStaked>
                <MyStakedContent className="wallet-text">
                    <MyRewardsUp>
                        <MyStakedText className="wallet-label" style={{textAlign: 'center'}}>My Stakes</MyStakedText>
                        <MyStakedText className="wallet-label">
                            {from}
                            <StakedValue>
                                {" "}
                                {0}
                            </StakedValue>
                        </MyStakedText>
                        <MyStakedText className="wallet-label">
                            {to}
                            <StakedValue>
                                {" "}
                                {0}
                            </StakedValue>
                        </MyStakedText>
                        <button
                            className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
                            style={{marginTop: '36px'}}
                            onClick={handleFotStakingUnstake}
                        >
                            Unstake
                        </button>
                    </MyRewardsUp>
                    <div className="w-full">
                        <MyStakedText className="wallet-label">
                            My Rewards
                            <StakedValue>
                                {" "}
                                {convertMicroDenomToDenom2(gfotStakingMyReward, fotTokenInfo.decimals)}
                            </StakedValue>
                        </MyStakedText>
                        <button className={`default-btn   ${!toggle && 'secondary-btn'}`} onClick={handleFotStakingClaimReward}>Claim</button>
                    </div>
                </MyStakedContent>
                
            </MyStaked>
        </Wrapper>
    )
}

export default StakeNClaimSecond