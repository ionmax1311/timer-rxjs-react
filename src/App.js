import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import React, { useEffect, useState } from 'react';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export default function App() {
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState('stop');

    useEffect(() => {
        const unsubscribe$ = new Subject();

        const o = interval(1000).pipe(takeUntil(unsubscribe$));
        o.subscribe((val) => {
            if (status === 'start') {
                setTime((val) => val + 1000);
                console.log('val: ', val);
            }
        });

        return () => {
            unsubscribe$.next();
            unsubscribe$.complete();
        };
    }, [status]);

    const start = () => {
        setStatus('start');
    };

    const stop = () => {
        setStatus('stop');
        setTime(0);
    };

    const reset = () => {
        setTime(0);
    };

    const wait = () => {
        setStatus('wait');
    };

    return ( <
        Box display = "flex"
        alignItems = "center"
        justifyContent = "center"
        style = {
            {
                minHeight: '100vh',
                width: '100%',
            }
        } >
        <
        span style = {
            { margin: 20 } } > { ' ' } { new Date(time).toISOString().slice(11, 19) } { ' ' } <
        /span>{' '} <
        Button variant = "contained"
        color = "primary"
        onClick = { start }
        style = {
            { margin: 20 } } >
        Start { ' ' } <
        /Button>{' '} <
        Button variant = "contained"
        color = "primary"
        onClick = { stop }
        style = {
            { margin: 20 } } >
        Stop { ' ' } <
        /Button>{' '} <
        Button variant = "contained"
        color = "primary"
        onClick = { reset }
        style = {
            { margin: 20 } } >
        Reset { ' ' } <
        /Button>{' '} <
        Button variant = "contained"
        color = "primary"
        onClick = { wait }
        style = {
            { margin: 20 } } >
        Wait { ' ' } <
        /Button>{' '} <
        /Box>
    );
}

ReactDOM.render( < App / > , document.getElementById('root'));