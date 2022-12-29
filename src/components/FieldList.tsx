import { Box } from "@mui/system"
import { SideListItem } from "./SideListItem"
import AddIcon from '@mui/icons-material/Add';
import { CircularProgress, IconButton } from "@mui/material";
import { FieldListItem } from "./FieldListItem";
import { useCallback, useEffect, useState } from "react";
import api from "../api.json";

type DataType = {
    id: Number;
}
type FieldType =
    {
        id: Number | null,
        dataType: {
            id: Number | null,
            name: String | null
        },
        name: String,
        type: String,
        expanded: boolean
    }

export const FieldList = (props: DataType) => {
    const [items, setItems] = useState<any>([]);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        updateList();
    }, [])

    const updateList = async () => {
        console.log("clickado")
        try {
            const options = {
                method: 'GET'
            };

            const params = new URLSearchParams();
            params.set("dataTypeId", props.id.toString());

            const response = await fetch(api.FieldType.getAll + params, options);
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    }

    const showItens = useCallback(() => {
        console.log("data", data);
        if (data && !data.error) {
            const model = data.map(element => { return {...element, expanded: false}});
            setItems([...items, model]);
        }
        return items.map(element => {
            return (<FieldListItem id={element.id} dataTypeId={element.dataType.id} expanded={element.expanded} name={element.name} tipo={element.type}/>)
        });
    }, [items]);

    const createFieldType = useCallback(() => {
        console.log("item", items);
        const fieldType = {
            id: null,
            dataType: {
                id: props.id,
                name: null
            },
            name: "",
            type: "",
            expanded: true
        } as FieldType;
        setItems([...items, fieldType]);
    }, [items]);

    return (
        <div>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '99%' }}>
                <IconButton
                    size="large"
                    edge="end"
                    color="primary"
                    aria-label="profile"
                    onClick={createFieldType}
                >
                    <AddIcon />
                </IconButton>
            </Box>
            <Box sx={{ border: 'solid 1px black', padding: '10px', maxHeight: '500px', overflowY: 'scroll' }}>
                {loading ? <CircularProgress color="secondary" /> : error ? null : showItens()}
            </Box>
        </div>
    );
} 