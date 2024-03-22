
/**
 * This Class is used to show a Global Modal or a Notification bar within our anywhere in our application
 */
import { useRef, useContext, useState, useEffect, createContext, ReactNode } from 'react'

/**
 * Main Context Which will be responsible to show and hide the modal/Notification Component
 */
type ModalContextProps = {
    show: (title: string) => void;
    hide: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);


const Noti: React.FC = ({title, isOpen, setOpen}) => {

    let timerId = useRef<number | undefined>(undefined)

    useEffect( () => {

        clearTimer()
        startTimer()
    })

    const clearTimer = () => {
        if (timerId.current) {
            clearInterval(timerId.current)
        }
    }

    const startTimer = () => {
        timerId.current = window.setTimeout(() => {
            setOpen(false)
        }, 3000)
    }


    return <div onMouseEnter={clearTimer} onMouseLeave={startTimer} className="noti" >
                <h4>{title}</h4>
                <button onClick={() => setOpen(false)} >x</button> 
            </div>
}

export function NotificationProvider({ children, value } : { children: ReactNode, providerValue: string}) {
    
    const [ isOpen, setOpen ] = useState<boolean>(false);
    const [ title, setTitle ] = useState<string>("Default Notification Title");

    const show = ({passedTitle}) => {
        setOpen(true) 
        setTitle(passedTitle || title)
    }

    const hide = () => {
        setOpen(false)
    }
    
    return <ModalContext.Provider value={{show, hide}}>
                {isOpen &&  <Noti title={title} isOpen={isOpen} setOpen={setOpen} /> } 
                {children} 
        </ModalContext.Provider>
}

export function useNotification() { 
    
    return useContext(ModalContext)

}
