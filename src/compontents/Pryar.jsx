import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { memo, useEffect, useMemo } from "react";
import { prayerCards } from "./PryarData";
import moment from "moment";
import "moment/dist/locale/ar-dz";
import { CalculationMethod, Coordinates, PrayerTimes } from "adhan";
import { motion } from "framer-motion";

moment.locale("ar");

function formatTime(date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

// إعدادات ظهور الكروت واحد ورا التاني (Stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// حركة كل كارت من فوق لتحت
const cardVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Pryar({ lat, lng, setToday, timings, setTimings, nextPrayerIndex }) {
  const prayerTimes = useMemo(() => {
    if (!lat || !lng) return null;
    const coordinates = new Coordinates(lat, lng);
    const params = CalculationMethod.Egyptian();
    const date = new Date();
    return new PrayerTimes(coordinates, date, params);
  }, [lat, lng]);

  useEffect(() => {
    if (!prayerTimes || !setTimings) return;
    const timingsObj = {
      Fajr: formatTime(prayerTimes.fajr),
      Dhuhr: formatTime(prayerTimes.dhuhr),
      Asr: formatTime(prayerTimes.asr),
      Maghrib: formatTime(prayerTimes.maghrib),
      Isha: formatTime(prayerTimes.isha),
    };
    setTimings(timingsObj);

    if (typeof setToday === "function") {
      setToday(moment().format("MMM Do YYYY | h:mm A"));
    }
  }, [prayerTimes, setTimings, setToday]);

  return (
    <Stack
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      direction="row"
      useFlexGap
      flexWrap="wrap"
      sx={{
        gap: { xs: 2, sm: 3 },
        alignItems: "stretch",
        justifyContent: "center",
        py: 2,
        px: { xs: 1, sm: 2 },
      }}
    >
      {prayerCards.map((prayer, index) => {
        const isNext = index === nextPrayerIndex;
        return (
          <Box
            component={motion.div}
            variants={cardVariants}
            key={prayer.title}
            sx={{
              display: "flex",
              width: {
                xs: "100%",
                sm: "calc(50% - 24px)",
                md: "calc(33.333% - 24px)",
                lg: "260px",
              },
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              transform: isNext ? "translateY(-15px)" : "none",
              borderRadius: 2,
              boxShadow: isNext
                ? "0 0 18px 4px rgba(255, 215, 0, 0.5), 0 0 50px 10px rgba(245, 158, 11, 0.3)"
                : "none",
              border: isNext
                ? "1.5px solid rgba(255, 215, 0, 0.6)"
                : "1.5px solid transparent",
            }}
          >
            <Card
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
              title={prayer.title}
            >
              <CardMedia sx={{ height: 180 }} image={prayer.image} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
                >
                  {prayer.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  sx={{
                    color: "white",
                    fontSize: { xs: "0.85rem", sm: "1rem" },
                  }}
                >
                  {prayer.subtitle}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    mb: 2,
                  }}
                >
                  {prayer.description}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    mt: "auto",
                  }}
                >
                  {timings?.[prayer.timingKey] || prayer.Time}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Stack>
  );
}

export default memo(Pryar);
