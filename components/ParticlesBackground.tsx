"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = {
        fullScreen: {
            enable: false,
            zIndex: 0,
        },
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: false,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "attract",
                },
            },
            modes: {
                attract: {
                    distance: 200,
                    duration: 0.4,
                    easing: "ease-out-quad",
                    factor: 1,
                    maxSpeed: 50,
                    speed: 1,
                },
            },
        },
        particles: {
            color: {
                value: "#6ea8ff",
            },
            links: {
                enable: false,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out",
                },
                random: false,
                speed: 2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 300,
            },
            opacity: {
                value: { min: 0.3, max: 0.6 },
                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: false,
                },
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    };

    if (!init) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            options={options}
            className="absolute inset-0"
        />
    );
}
