import { Box, Card, CardContent, Typography } from "@mui/material"

type Props = {
    id: String;
    name: String
    tipo: String
}

export const FormItem = (props: Props): JSX.Element => {
    const html = `<label>${props.name} <input id="${props.id}" type="${props.tipo}" placeholder="${props.name}" /><label/> \n`
    return (
        <div draggable onDragStart={(event) => {event.dataTransfer.setData('text/plain', html)}}>
            <Card sx={{ minWidth: 275, marginBottom: '10px', margin: "10px" }}>
                <CardContent>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h5" component="div">
                            {props.name}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </div>);
}