/* eslint-disable */
import {  Grid, Stack, Typography} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import CustomProgress from './ProgressionBar';
export default function Status({isLoading , status}){
    return(
  <DashboardLayout>
    <MDBox mt={5} mb={5} >
      <Grid container justifyContent="center" alignItems="center">
          <item item xs={15} md={5}>
            <Typography style={{ fontWeight:"bold" , marginRight:"400px" ,marginBottom:"20px"}}>
                {isLoading
                 ? `Calculating... ${status || 'uploading'}...`
                 : 'Veuillez donner votre feedback !'
                }
            </Typography>
            <Stack sx={{ width: '45%'  ,justifyContent: 'center',alignItems: 'center',}}>
              <CustomProgress isLoading={isLoading}  />
            </Stack>
          </item>
      </Grid>
    </MDBox> 
  </DashboardLayout>
    );
}