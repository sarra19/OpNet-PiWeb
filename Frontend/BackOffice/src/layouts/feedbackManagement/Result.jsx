/* eslint-disable */
import { Grid, Typography } from '@mui/material' ;
import Highlighted from './Highlighted';


export default function Result ({transcript}){
    return(
        <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
            <Typography>
                {transcript.sentiment_analysis_results.map(result => ( 
                <Highlighted text={result.text} sentiment={result.sentiment} entities={transcript.entities} />
            ))}
            </Typography>
            {/* <Typography>
                {transcript.sentiment_analysis_results.map(result => (
                    <div key={result.start}> 
                    <p>Text: {result.text}</p>
                    <p>Sentiment: {result.sentiment}</p>
                    </div>
                ))}
            </Typography> */}

        </Grid>
    );
}