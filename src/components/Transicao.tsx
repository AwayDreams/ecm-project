import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { PageHeader } from './PageHeader';
import './style/transicao.css';

type Props = {
    children: JSX.Element
}

export const Transicao = (props: Props): JSX.Element => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <CSSTransition in={isVisible} timeout={1000} classNames="card" unmountOnExit>
            <div>
                <PageHeader nome={"Lucas Coelho de Faria"}></PageHeader>
                <Box sx={{height: '100%'}}>{props.children}</Box>
            </div>
        </CSSTransition>
    )
}