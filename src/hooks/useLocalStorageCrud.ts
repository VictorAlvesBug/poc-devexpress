import useLocalStorage from "./useLocalStorage";

type TTable<TItem> = {
    [key: string]: TItem;
};

export default function useLocalStorageCrud<TEntity>(){
    const [table, setTable] = useLocalStorage<TTable<TEntity>>('table', {});
    
    const get = (id: string) => {
        const result = Object.entries(table).find(([key, _]) => key === id);

        if(!result){
            return undefined;
        }
        
        return result[1];
    };
    
    const filter = (callback: (entity: TEntity) => boolean) => {
        const result = Object.entries(table).filter(([_, value]) => callback(value));

        if(!result){
            return [] as TEntity[];
        }
        
        return result.map(([_, value]) => value);
    };

    const save = (id: string, entity: TEntity) => {
        const newTable: TTable<TEntity> = { ...table };
        newTable[id] = entity;
        setTable(newTable);
        return entity;
    };

    const remove = (id: string) => {
        const found = Object.entries(table).some(([key, _]) => key === id);

        if(!found) return false;

        const newTable = { ...table };
        delete newTable[id];
        setTable(newTable);

        return JSON.stringify(table) !== JSON.stringify(newTable);
    };

    return {
        get,
        filter,
        save,
        remove
    } as {
        get: (id: string) => TEntity | undefined,
        filter: (callback: (entity: TEntity) => boolean) => TEntity[],
        save: (id: string, entity: TEntity) => TEntity | undefined,
        remove: (id: string) => boolean
    };
}