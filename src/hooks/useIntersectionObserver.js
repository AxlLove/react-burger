import {useEffect, useState} from "react";
import {useRef} from "react";

export const useIntersectionObserver = (options) => {
    const containerRef = useRef(null)
    const [current, setCurrent] = useState('Булки')

    const callback = (entries) => {
        entries.forEach(entry=>{
            if(entry.isIntersecting) {
                setCurrent(entry.target.getAttribute("name"))
            }
        })
    }

    useEffect(()=> {
        const containerChild = containerRef.current.childNodes
        const observer = new IntersectionObserver(callback, {root: containerRef.current, ...options})
        containerChild.forEach(item=>{
            observer.observe(item)
        })
        return () => {
            containerChild.forEach(item=> observer.unobserve(item))
        }


    }, [containerRef, options])

    return [containerRef, current, setCurrent]

}