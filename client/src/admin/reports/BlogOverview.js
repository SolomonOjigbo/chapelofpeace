import React from 'react'
import Title from '../components/Title'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material'

const BlogOverview = () => {
  return (
    <>
      <Title>Blog Overview</Title>
      <Grid
        container
        spacing={2}
        columns={12}
        justifyContent='center'
        alignItems='center'
        style={{ padding: '20px' }}
      >
        {/**LHS**/}

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Card
            sx={{
              minWidth: 200,
              boxShadow:
                '0 .46875rem 2.1875rem rgba(90,97,105,.1),0 .9375rem 1.40625rem rgba(90,97,105,.1),0 .25rem .53125rem rgba(90,97,105,.12),0 .125rem .1875rem rgba(90,97,105,.1)'
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h8'
                  component='div'
                  align='center'
                  sx={{ mt: 3 }}
                >
                  POSTS
                </Typography>
                <Typography
                  variant='h3'
                  color='text.secondary'
                  align='center'
                  sx={{
                    mt: 2,
                    mb: 3
                  }}
                >
                  2,390
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/**MIDDLE**/}

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Card
            sx={{
              minWidth: 200,
              boxShadow:
                '0 .46875rem 2.1875rem rgba(90,97,105,.1),0 .9375rem 1.40625rem rgba(90,97,105,.1),0 .25rem .53125rem rgba(90,97,105,.12),0 .125rem .1875rem rgba(90,97,105,.1)'
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h8'
                  component='div'
                  align='center'
                  sx={{ mt: 3 }}
                >
                  COMMENTS
                </Typography>
                <Typography
                  variant='h3'
                  color='text.secondary'
                  align='center'
                  sx={{
                    mt: 2,
                    mb: 3
                  }}
                >
                  1,600
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/**RHS**/}

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Card
            sx={{
              minWidth: 200,
              boxShadow:
                '0 .46875rem 2.1875rem rgba(90,97,105,.1),0 .9375rem 1.40625rem rgba(90,97,105,.1),0 .25rem .53125rem rgba(90,97,105,.12),0 .125rem .1875rem rgba(90,97,105,.1)'
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h8'
                  component='div'
                  align='center'
                  sx={{ mt: 3 }}
                >
                  SUBSCRIBERS
                </Typography>
                <Typography
                  variant='h3'
                  color='text.secondary'
                  align='center'
                  sx={{
                    mt: 2,
                    mb: 3
                  }}
                >
                  3,250
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default BlogOverview
