import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import {Vector3} from 'three';

function Box({ color }){
    const boxRef = useRef();
    const timeRef = useRef(0);
    const [xRotSpeed] = useState(() => Math.random());
    const [yRotSpeed] = useState(() => Math.random());
    const [scale] = useState(() => Math.pow(Math.random(), 2) * 0.5 + 0.05);
    const [position, setPosition] = useState(getInitialPosition());

    function getInitialPosition(){
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15);
        if(v.x < 0) v.x -= 1.75;
        if(v.x > 0) v.x += 1.75;

        return v;
    }

    function resetPosition(){
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 10) + 10);
        if(v.x < 0) v.x -= 1.75;
        if(v.x > 0) v.x += 1.75;

        setPosition(v);
    }

    useFrame((state, delta) => {
        timeRef.current += delta * 1.2;
        let newA = position.z - (timeRef.current);

        if(newA < -10){
            resetPosition();
            timeRef.current = 0;
        }

        boxRef.current.position.set(position.x, position.y, newA);
        boxRef.current.rotation.x += delta * xRotSpeed;
        boxRef.current.rotation.y += delta * yRotSpeed;
    }, [xRotSpeed, yRotSpeed, position]);

    return (
        <mesh ref={boxRef} scale={scale} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} envMapIntensity={0.15} />
        </mesh>
    );
}

export function Boxes(){
    const [arr] = useState(() => {
        let a = [];
        for(let i = 0; i < 100; i++) a.push(0);
        return a;        
    });
    return (
        <>
            {arr.map((e, i) => <Box key={i} color={i%2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />)}
        </>
    )
}
