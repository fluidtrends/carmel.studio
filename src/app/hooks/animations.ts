import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import anime from 'animejs'

const animations: any = (id: string) => ({
    start: {
        targets: `.${id}`,
        opacity: 1,
        duration: 750,
        easing: "easeOutExpo",
        delay: (el: any, i: number) => 50 * i
    },
    base: {
        targets: `.${id} .letter`,
        scale: [4,1],
        opacity: [0,1],
        easing: "easeOutExpo",
        translateZ: 0,
        duration: 1500,
        delay: (el: any, i: number) => 150 * i
    }, 
    intro: {
        targets: `.${id} .letter`,
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el: any, i: number) => 50 * i
    },
    bounce: {
        targets: `.${id}`,
        easing: "easeOutExpo",
        duration: 1000,
        opacity: 1,
        delay: 1000
    },
    line: {
        targets: `.${id} .letter`,
        translateY: [-100,0],
        easing: "easeOutExpo",
        duration: 1500,
        delay: (el: any, i: number) => 70 * i
    }
})

export const useAnimatedText = (frames: any) => {
    useLayoutEffect(() => {
        let ani = anime.timeline({loop: false})
        let opts: any = {}
       
        frames.map((frame: any) => {
            let id = frame
            let types: any = ['base']

            if (typeof frame !== 'string') {
                id = frame[0]
                types = [frame[1]]

                if (typeof frame[1] !== 'string') {
                    types = [...frame[1]]
                    if (frame.length > 2) {
                        opts = { ...frame[2]}
                    }
                } 
            }

            const anims = animations(id)
            const textWrapper: any = document.querySelector(`.${id}`);
            textWrapper.style.opacity = 0
            
            if (!opts.button) {
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
            }

            ani.add(anims.start)
            types.map((t: string) => {
                ani = ani.add(anims[t])
            })
        })
    }, []) 
}