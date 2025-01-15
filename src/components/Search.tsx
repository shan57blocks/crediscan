import {
  Box,
  Button,
  Card,
  CardContent,
  css,
  Link,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, Discover } from "../utils/api";
import { DISCOVER_KEY } from "../utils/const";

function Search() {
  const navigate = useNavigate();
  const [value, changeValue] = useState("");
  const [discover, setDiscover] = useState<Discover[]>();

  useEffect(() => {
    const fetchDiscover = async () => {
      const response = await api.getDiscover();
      setDiscover(response);
      localStorage.setItem(DISCOVER_KEY, JSON.stringify(response));
    };
    fetchDiscover();
  }, []);

  const goToSearchResult = () => {
    navigate(`/search-result?search=${value}`);
  };

  const styles = {
    wrapper: css`
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
    `,
    header: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
    searchWrapper: css`
      display: flex;
      align-items: center;
    `,
    title: css`
      font-family: "Red-Hat-Display";
      font-size: 40px;
      font-style: normal;
      font-weight: 700;
      line-height: 116.7%;
      background: var(
        --Dark-Purple-Gradient,
        linear-gradient(233deg, #701aff 4.17%, #fe557a 178.69%)
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
      margin-top: 20px;
    `,
    textField: css`
      width: 460px;
    `,
    searchBtn: css`
      width: 100px;
      margin-left: 10px;
    `,
    hotWrapper: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 40px;
      width: 100%;
    `,
    hot: css`
      max-width: 800px;
    `,
    hotTitle: css`
      font-size: 24px;
      font-family: "Red-Hat-Display";
      font-weight: 500;
    `,
    hotDesc: css`
      font-size: 14px;
      font-family: "Red-Hat-Display";
      margin-bottom: 30px;
    `,
    link: css`
      font-size: 18px;
      font-family: "Red-Hat-Display";
    `,
  };

  return (
    <Box css={styles.wrapper}>
      <Box css={styles.header}>
        <Box css={styles.title}>Find the next AI/Web3 Unicorn</Box>
        <Box css={styles.searchWrapper}>
          <TextField
            css={styles.textField}
            label="Please input startup name"
            variant="outlined"
            value={value}
            onChange={(e) => changeValue(e.target.value)}
            size="small"
          />
          <Button
            variant="contained"
            css={styles.searchBtn}
            onClick={goToSearchResult}
          >
            SEARCH
          </Button>
        </Box>
        <Box></Box>
      </Box>
      <Box css={styles.hotWrapper}>
        <Box css={styles.hot}>
          <Box>
            <Box css={styles.hotTitle}>Hot Web3 Startups</Box>
            <Box css={styles.hotDesc}>
              Identify emerging Web3 startups with innovative tech, strong
              adoption, strategic backing, and adaptable teams, capable of
              disrupting industries and achieving unicorn status.
            </Box>
          </Box>
          <Box>
            {!discover && (
              <Box sx={{ width: "100%" }}>
                <Skeleton animation="wave" height={30} />
                <Skeleton animation="wave" height={30} />
                <Skeleton animation="wave" height={30} />
                <Skeleton animation="wave" height={30} />
                <Skeleton animation="wave" height={30} />
                <Skeleton animation="wave" height={30} />
                <Skeleton animation="wave" height={30} />
              </Box>
            )}
            {discover &&
              discover.map((company) => (
                <Card variant="outlined" sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Link
                      css={styles.link}
                      href={`/#/search-result?search=${company.company_name}`}
                    >
                      {company.company_name}
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {company.background}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Search;
