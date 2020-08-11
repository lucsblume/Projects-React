import React from 'react';

import styles from './Cards.module.css';

import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup'; //esse pacote permite a animação de numeros em real time
import cx from 'classnames'; //pode adicionar multiplos elementos a classe

const Cards = ({data: {confirmed, recovered,deaths, lastUpdate}}) => {

    

    if(!confirmed){
        return 'loading...'
    }
   

    return(

        <div className={styles.container}>

            <Grid container spacing={3} justify="center">

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>

                    <CardContent>

                        <Typography color="textSecondary" gutterBottom> Infected</Typography>
                        
                        <Typography varaint="h5">

                             <CountUp

                                start={0}
                                end={confirmed.value}
                                duration={2.5}
                                separator=","
                             />   

                        </Typography>

                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>

                        <Typography variant="body2" > Number of active cases of COVID-19</Typography>

                    </CardContent>

                </Grid>



                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>

                    <CardContent>

                        <Typography color="textSecondary" gutterBottom> Recovered</Typography>

                       <Typography varaint="h5">

                             <CountUp

                                start={0}
                                end={recovered.value}
                                duration={2.5}
                                separator=","
                             />   

                        </Typography>

                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>

                        <Typography variant="body2" > Number of active recovery COVID-19</Typography>

                    </CardContent>

                </Grid>



                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>

                    <CardContent>

                        <Typography color="textSecondary" gutterBottom> Deaths</Typography>

                        <Typography varaint="h5">

                             <CountUp

                                start={0}
                                end={deaths.value}
                                duration={2.5}
                                separator=","
                             />   

                        </Typography>

                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>

                        <Typography variant="body2" > Number of deaths caused by COVID-19</Typography>

                    </CardContent>

                </Grid>

            </Grid>

        </div>
    )
}

export default Cards;