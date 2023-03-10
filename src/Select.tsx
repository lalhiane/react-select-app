import { useEffect, useRef, useState } from "react";

import Styles from "./select.module.css";

export type SelectOption = {

    label: string

    value: string | number

}

type MultiSelectProps = {

    multiple: true

    currentOption_s: SelectOption[]

    onChange: (option: SelectOption[]) => void

}

type SingleSelectProps = {

    multiple: false

    currentOption_s?: SelectOption

    onChange: (option: SelectOption | undefined) => void

}

type Props = {

    options: SelectOption[]

} & (MultiSelectProps | SingleSelectProps)

const Select: React.FC<Props> = ({ multiple, options, currentOption_s, onChange }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [highlightedIndex, setHighlightedIndex] = useState<number>(0)

    const containerRef = useRef<HTMLDivElement>(null);

    const selectOption = (option: SelectOption) => {

        if (multiple) {

            if (currentOption_s?.includes(option)) {

                onChange(currentOption_s.filter(o => o !== option))

            } else {

                onChange([...currentOption_s, option])

            }
 
        } else {

            if (option !== currentOption_s) onChange(option)

        }

    }

    const isOptionSelected = (option: SelectOption) => {

        return multiple ? currentOption_s.includes(option) : option === currentOption_s

    }

    const handler = (event: KeyboardEvent) => {

        event.stopPropagation();

        if (event.target !== containerRef.current) return;

        switch (event.code) {

            case "Enter":
            case "Space":

                setIsOpen(prev => !prev)

                if (isOpen) selectOption(options[highlightedIndex])
                
                break
            
            case "ArrowUp":
            case "ArrowDown":

                if (!isOpen) {

                    setIsOpen(true)

                    break

                }

                let i = highlightedIndex + (event.code === "ArrowDown" ? 1 : -1)

                if (i >= 0 && i < options.length) setHighlightedIndex(i)

                break
            
            case "Escape":

                setIsOpen(false)
                
                break
        
            default:

                break
        }

    }

    useEffect(() => {

        setHighlightedIndex(0)

    }, [isOpen])

    useEffect(() => {

        containerRef.current?.addEventListener("keydown", handler);

        return () => containerRef.current?.removeEventListener("keydown", handler);

    }, [isOpen, highlightedIndex]);

    return (

        <div
            
            ref={containerRef}
            
            tabIndex={0}
            
            className={Styles.container}

            onClick={() => setIsOpen(prev => !prev)}

            onBlur={() => setIsOpen(false)}
        
        >

            <div className={Styles.current}>{

                multiple ? currentOption_s.map(option => {

                    return (

                        <button
                            
                            key={option.value}

                            className={Styles["option-btn"]}

                            onClick={() => {

                                onChange(currentOption_s.filter(o => o !== option))

                            }}
                        
                        >
                            
                            {option.label}

                            <span className={Styles["del-option"]}>&times;</span>

                        </button>

                    )

                }) : currentOption_s?.label
                
            }</div>

            <button
                
                className={Styles["clear-btn"]}

                onClick={(e) => {

                    e.stopPropagation()

                    multiple ? onChange([]) : onChange(undefined)

                }}
            
            >
                
                &times;
            
            </button>

            <div className={Styles.divider}></div>

            <div className={Styles.caret}></div>
        
            <ul className={`${Styles.options} ${isOpen ? Styles.show : ""}`}>{

                options.map((option, index) => {

                    return (

                        <li
                            
                            key={option.value}

                            className={`
                            
                                ${Styles.option}
                            
                                ${isOptionSelected(option) ? Styles.selected : ""}

                                ${highlightedIndex === index ? Styles.highlight : ""}
                            
                            `}

                            onClick={(e) => {

                                e.stopPropagation()

                                selectOption(option)

                            }}

                            onMouseEnter={(e) => {

                                e.stopPropagation()

                                setHighlightedIndex(index)

                            }}
                        
                        >
                            
                            {option.label}
                        
                        </li>

                    )

                })

            }</ul>

        </div>

    )

} 

export default Select;