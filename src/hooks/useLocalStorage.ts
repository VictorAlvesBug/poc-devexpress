

import { useEffect, useRef, useState } from "react";

export default function useLocalStorage<
    TItem extends string | number | boolean | object
>(
    itemName: string, 
    initialValue: TItem
) {
    const itemType = useRef(typeof initialValue);
    const [item, setValue] = useState(initialValue);

    useEffect(() => {
        const stored = localStorage.getItem(itemName);

        if (stored !== null) {
            if (typeof initialValue === 'object') {
                return setValue(JSON.parse(stored));
            }

            setValue(stored as TItem);
            return;
        }

        if (typeof initialValue === 'object') {
            return localStorage.setItem(itemName, JSON.stringify(initialValue));
        }

        return localStorage.setItem(itemName, String(initialValue));
    }, []);

    const setItem = (newValue: TItem) => {
        if (typeof newValue !== itemType.current) {
            throw new Error(`O item ${itemName} precisa ser do tipo ${itemType.current}`);
        }

        setValue(newValue);

        if (typeof newValue === 'object') {
            return localStorage.setItem(itemName, JSON.stringify(newValue));
        }

        return localStorage.setItem(itemName, String(newValue));
    };

    return [item, setItem] as [TItem, (newValue: TItem) => {}];
}