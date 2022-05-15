import React from 'react';
import { useSelector } from 'react-redux';
import Investment from '../Investment';

Footer.propTypes = {};

function Footer(props) {
    const allAnswer = useSelector((state) => state.currentAnswers);
    const allQuestion = useSelector((state) => state.questions);
    const currentQuestion = useSelector((state) => state.currentQuestion);
    const currentPhase = useSelector((state) => state.currentPhase);

    const caculatePhaseLength = () => {
        var phase1Data = [],
            phase3Data = [],
            phase5Data = [];

        var phaseLength = {
            phase1: [],
            phase3: [],
            phase5: [],
        };
        // const dataQuestion = allQuestion.data;
        for (let i = 0; i < allQuestion.length; i++) {
            switch (allQuestion[i].phase) {
                case 1:
                    // phase1Length++;
                    phase1Data.push(allQuestion[i]);
                    break;
                case 3:
                    phase3Data.push(allQuestion[i]);
                    break;
                case 5:
                    phase5Data.push(allQuestion[i]);
                    break;
                default:
                    break;
            }
        }
        // console.log(phase1Length);
        return {
            ...phaseLength,
            phase1: phase1Data,
            phase3: phase3Data,
            phase5: phase5Data,
        };
    };

    const phaseData = caculatePhaseLength();
    // console.log(phaseData);

    var phase3El = () => {
        let phase = currentPhase;
        if (phase < 3) {
            return (
                <p className='end-phase h-4 w-4 border-2 border-input-border rounded-full ml-2'>
                    <p className='absolute top-7 ml-0.5 text-sm font-semibold text-second'>2</p>
                </p>
            );
        } else if (phase === 3) {
            return (
                <p className='w-6 h-6 border border-pink rounded-full flex justify-center items-center bg-pink mx-1'>
                    <i className='iconw-processing align-middle text-icon2 text-white'></i>
                    <p className='absolute top-7 block w-16 text-sm font-semibold text-second'>Phase 2</p>
                </p>
            );
        } else if (phase > 3) {
            return (
                <p className='w-6 h-6 border border-pink rounded-full flex justify-center items-center mx-1'>
                    <i className='iconw-success align-middle text-icon text-pink'></i>
                    <p className='absolute top-7 text-sm font-semibold text-second'>2</p>
                </p>
            );
        }
    };

    var phase6El = () => {
        let phase = currentPhase;

        if (currentPhase === 6) {
            return (
                <p className='w-6 h-6 border border-pink rounded-full flex justify-center items-center mx-1'>
                    <i className='iconw-success align-middle text-icon text-pink'></i>
                    <p className='absolute top-7 text-sm font-semibold text-second'>3</p>
                </p>
            );
        } else if (phase < 5) {
            return (
                <p className='end-phase h-4 w-4 border-2 border-input-border rounded-full ml-2'>
                    <p className='absolute top-7 ml-0.5 text-sm font-semibold text-second'>3</p>
                </p>
            );
        } else if (phase === 5) {
            return (
                <p className='w-6 h-6 border border-pink rounded-full flex justify-center items-center bg-pink mx-1'>
                    <i className='iconw-processing align-middle text-icon2 text-white'></i>
                    <p className='absolute top-7 block w-16 text-sm font-semibold text-second ml-2'>Phase 3</p>
                </p>
            );
        }
    };

    var phase1Dot = () => {
        let array = [];
        const index = allQuestion.findIndex((x) => x.id === currentQuestion.id);
        var size = Math.round(
            (5 / 100) * ((index / (phaseData.phase1.length - 1)) * 100)
        );
        // size = size <= 0 ? 1 : size;

        for (let i = 1; i <= 5; i++) {
            let style =
                i <= size || currentQuestion.type === 'SUCCESSFULLY'
                    ? 'text-pink'
                    : 'text-input-border';

            array.push(
                <li>
                    <i
                        className={`iconw-dot text-dot ${style} align-middle`}
                    ></i>
                </li>
            );
        }
        return array;
    };

    var phase3Dot = () => {
        let array = [];
        const index = allQuestion.findIndex((x) => x.id === currentQuestion.id);
        var size = Math.round(
            (5 / 100) *
                (((index - phaseData.phase1.length) /
                    (phaseData.phase3.length - 1)) *
                    100)
        );
        // size = size <= 0 ? 1 : size;

        for (let i = 1; i <= 5; i++) {
            let style =
                (i <= size && currentQuestion.phase >= 3) ||
                currentQuestion.type === 'SUCCESSFULLY'
                    ? 'text-pink'
                    : 'text-input-border';

            // if (i<=size && currentQuestion.phase >= 5) {}

            array.push(
                <li>
                    <i
                        className={`iconw-dot text-dot ${style} align-middle`}
                    ></i>
                </li>
            );
        }
        return array;
    };

    var phase5Dot = () => {
        let array = [];
        const index = allQuestion.findIndex((x) => x.id === currentQuestion.id);
        var size = Math.round(
            (5 / 100) *
                (((index - phaseData.phase1.length - phaseData.phase3.length) /
                    (phaseData.phase5.length - 1)) *
                    100)
        );
        // size = size <= 0 ? 1 : size;

        for (let i = 1; i <= 5; i++) {
            let style =
                (i <= size && currentQuestion.phase >= 5) ||
                currentQuestion.type === 'SUCCESSFULLY'
                    ? 'text-pink'
                    : 'text-input-border';

            array.push(
                <li>
                    <i
                        className={`iconw-dot text-dot ${style} align-middle`}
                    ></i>
                </li>
            );
        }
        return array;
    };

    const styleFooter = () => {
        return currentQuestion.type === 'FORM_PORTFOLIO_3' ? ' mb-28' : '';
    }


    return (
        <footer className={`h-13.223 border border-porfolio${styleFooter()} ${currentPhase === 6 ? "invisible" : "block"}`}>
            {allAnswer.length >= 3 && (
                <div className='footer-content h-full flex justify-between items-center max-w-1152 px-3 mx-auto flex-wrap'>
                    <div className='footer-left flex gap-3 items-center mx-auto xl:mx-0 relative'>
                        <p className='pr-3'>
                            <i className='iconw-triangle-right align-middle text-pink'></i>
                        </p>
                        <ul className='flex gap-2 md:gap-3'>{phase1Dot()}</ul>
                        {currentQuestion.phase > 1 ? (
                            <p className='w-6 h-6 border border-pink rounded-full flex justify-center items-center mx-1'>
                                <i className='iconw-success align-middle text-icon text-pink'></i>
                                <p className='absolute top-7 mr-0.5 text-sm font-semibold text-second'>1</p>
                            </p>
                        ) : (
                            <p className='w-6 h-6 border border-pink rounded-full flex justify-center items-center bg-pink mx-1'>
                                <i className='iconw-processing align-middle text-icon2 text-white leading-6'></i>
                                <p className='absolute top-7 block w-16 ml-2 text-sm font-semibold text-second'>Phase 1</p>
                            </p>
                        )}

                        <ul className='flex gap-2 md:gap-3'>{phase3Dot()}</ul>
                        {phase3El()}
                        <ul className='flex gap-2 md:gap-3'>{phase5Dot()}</ul>
                        {phase6El()}
                    </div>
                    <div className='footer-right mx-auto xl:mx-0 flex items-center'>
                        <Investment allAnswer={allAnswer} />
                    </div>
                </div>
            )}
        </footer>
    );
}

export default Footer;
