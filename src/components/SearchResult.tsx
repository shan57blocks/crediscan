import {
  Box,
  Card,
  CardContent,
  css,
  Grid,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useSearchParams } from "react-router-dom";
import { api, Discover, GoogleSearch } from "../utils/api";
import { DISCOVER_KEY } from "../utils/const";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [googleSearch, setGoogleSearch] = useState<GoogleSearch[]>();
  const [discover, setDiscover] = useState<Discover>();
  const [aggregate, setAggregate] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const discoversStr = localStorage.getItem(DISCOVER_KEY);
    if (discoversStr) {
      const discovers = JSON.parse(discoversStr) as Discover[];
      const discover = discovers.find((item) => item.company_name === search);
      if (discover) {
        setDiscover(discover);
        setLoading(false);
      }
    }
  }, [search]);

  useEffect(() => {
    const fetchGoogleSearch = async () => {
      if (!search) {
        return;
      }
      const response = await api.getGoogleSearch(search);
      setGoogleSearch(response);
    };
    fetchGoogleSearch();
  }, [search]);

  useEffect(() => {
    const fetchAggregate = async () => {
      if (!search) {
        return;
      }
      const response = await api.getAggregate(search);
      setAggregate(response.content);
      setLoading(false);
    };
    fetchAggregate();
  }, [search]);

  const styles = {
    wrapper: css`
      display: flex;
      justify-content: center;
      flex-direction: column;
      max-width: 1200px;
      margin: 0 auto;
    `,
    title: css`
      margin-top: 20px;
      font-size: 28px;
      font-family: "Red-Hat-Display";
      font-weight: 600;
    `,
  };

  return (
    <Box css={styles.wrapper}>
      {aggregate && <Box css={styles.title}>{search}</Box>}
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {loading && (
            <Box sx={{ width: "100%", height: "100vh" }}>
              <Skeleton animation="wave" height={40} />
              <Skeleton animation="wave" height={40} />
              <Skeleton animation="wave" height={40} />
              <Skeleton animation="wave" height={40} />
              <Skeleton animation="wave" height={40} />
            </Box>
          )}
          {aggregate && (
            <List>
              <Card variant="outlined" style={{ width: "100%" }}>
                <ListItem alignItems="flex-start">
                  <CardContent style={{ paddingBottom: 0 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{
                        whiteSpace: "pre-wrap",
                      }}
                      gutterBottom
                    >
                      <Markdown>{aggregate}</Markdown>
                    </Typography>
                  </CardContent>
                </ListItem>
              </Card>
            </List>
          )}

          {discover && (
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {discover.company_name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {discover.background}
                </Typography>

                <Typography variant="h5" gutterBottom>
                  Founders
                </Typography>
                <List>
                  {discover.founders.map((founder, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemText
                        primary={founder.name}
                        secondary={founder.background}
                      />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h5" gutterBottom>
                  Funding
                </Typography>
                <List>
                  {discover.funding.map((fund, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Year: ${fund.year}`}
                        secondary={`Details: ${fund.details}`}
                      />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h5" gutterBottom>
                  Security Assessment
                </Typography>
                <Typography variant="body1" paragraph>
                  {discover.security_assessment.description}
                </Typography>
                <Typography variant="body1" paragraph>
                  Risks: {discover.security_assessment.risks}
                </Typography>
                <Typography variant="body2">Certifications:</Typography>
                <List>
                  {discover.security_assessment?.certifications &&
                    discover.security_assessment.certifications.map(
                      (certification, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={certification} />
                        </ListItem>
                      )
                    )}
                </List>
                <Typography variant="body2">Awards:</Typography>
                <List>
                  {discover.security_assessment?.awards &&
                    discover.security_assessment.awards.map((award, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={award} />
                      </ListItem>
                    ))}
                </List>

                <Typography variant="h5" gutterBottom>
                  User Reviews
                </Typography>
                <List>
                  {discover.user_reviews.map((review, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemText
                        primary={`${review.reviewer}, ${review.position}`}
                        secondary={review.review || review.feedback}
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ marginTop: "16px" }}
                >
                  Overall Summary
                </Typography>
                <Typography variant="body1" paragraph>
                  {discover.overall_summary}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        <Grid item xs={4}>
          {!googleSearch && (
            <Box sx={{ width: "100%", height: "100vh" }}>
              <Skeleton animation="wave" height={40} />
              <Skeleton animation="wave" height={40} />
              <Skeleton animation="wave" height={40} />
              <Skeleton animation="wave" height={40} />
              <Skeleton animation="wave" height={40} />
            </Box>
          )}
          {googleSearch && (
            <List>
              <Card variant="outlined" style={{ width: "100%" }}>
                {googleSearch.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <CardContent style={{ paddingBottom: 0 }}>
                        <Typography variant="h6">
                          <MuiLink
                            href={item.link}
                            target="_blank"
                            rel="noopener"
                          >
                            {item.title}
                          </MuiLink>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                        >
                          {item.snippet}
                        </Typography>
                        {item.date && (
                          <Typography variant="caption" color="textSecondary">
                            Date: {item.date}
                          </Typography>
                        )}
                        {item.sitelinks && (
                          <List>
                            {item.sitelinks.map((sitelink, i) => (
                              <ListItemText key={i}>
                                <MuiLink
                                  href={sitelink.link}
                                  target="_blank"
                                  rel="noopener"
                                >
                                  {sitelink.title}
                                </MuiLink>
                              </ListItemText>
                            ))}
                          </List>
                        )}
                      </CardContent>
                    </ListItem>
                  </React.Fragment>
                ))}
              </Card>
            </List>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchResult;
