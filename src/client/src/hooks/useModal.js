import { useState } from 'react';

export default function useModal() {
    const [isOpen, setIsOpen] = useState();
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    return [isOpen, open, close];
}