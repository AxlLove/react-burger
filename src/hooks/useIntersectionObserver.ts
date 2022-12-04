import {useEffect, useState} from "react";
import {useRef} from "react";

interface IOptions {
    root?: HTMLElement;
    rootMargin?: string;
    threshold?: number | Array<number>;
}

export const useIntersectionObserver = (options: IOptions) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [current, setCurrent] = useState<string | null>('Булки')

    const callback = (entries: Array<IntersectionObserverEntry>) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setCurrent(entry.target.getAttribute("id"))
            }
        })
    }

    useEffect(() => {
        const containerChild: NodeListOf<ChildNode> | undefined = containerRef.current?.childNodes
        const observer = new IntersectionObserver(callback, {root: containerRef.current, ...options})
        containerChild?.forEach(item => {
            observer.observe(item as Element)
        })
        return () => {
            containerChild?.forEach(item => observer.unobserve(item as Element))
        }


    }, [containerRef, options])

    return {containerRef, current}

}
 