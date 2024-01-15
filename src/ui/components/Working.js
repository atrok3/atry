import React from "react";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Working = ({ eqn, title, }) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {
                        Object.keys(eqn).map((item, i) => (
                            <li key={i} style={{ marginTop: i !== 0 ? 25 : 0 }}>
                                <p style={{ margin: 0, marginBottom: 10}} dangerouslySetInnerHTML={{ __html: `${eqn[item].title}` }}></p>
                                <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: `${eqn[item].left} = ${eqn[item].right}` }}></p>
                            </li>
                        ))
                    }
                </ul>
            </AccordionDetails>
        </Accordion>
    )
}

export default Working;