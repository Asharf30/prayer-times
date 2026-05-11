import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Pryar from "./Pryar";
import { prayerCards } from "./PryarData";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";

const CITY_STORAGE_KEY = "selectedPrayerCity";

const availableCities = [
  { nameArabic: "دميرة", apiValue: "Dimayrah", lat: 31.0364, lng: 31.3801 },
  { nameArabic: "القاهرة", apiValue: "Cairo", lat: 30.0444, lng: 31.2357 },
  { nameArabic: "المنصورة", apiValue: "Mansoura", lat: 31.0409, lng: 31.3785 },
  { nameArabic: "سوهاج", apiValue: "Sohag", lat: 26.5591, lng: 31.6948 },
  {
    nameArabic: "الإسكندرية",
    apiValue: "Alexandria",
    lat: 31.2001,
    lng: 29.9187,
  },
];

export default function MainContent() {
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem(CITY_STORAGE_KEY);
    return savedCity || availableCities[0].apiValue;
  });

  const [today, setToday] = useState();
  const [timings, setTimings] = useState();
  const [nextPryar, setNextPryar] = useState(0);
  const [remainingTime, setRemainingTime] = useState();
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem(CITY_STORAGE_KEY, city);
  }, [city]);

  const selectedCityObj = availableCities.find((c) => c.apiValue === city);
  const cityNameArabic = selectedCityObj?.nameArabic;
  const countDownTimer = useCallback(() => {
    if (!timings) return;

    const momentNow = moment();
    
    let nextPryarIndex;

    // التعديل هنا: ضفنا "en" عشان يفهم AM و PM
    if (momentNow.isBefore(moment(timings.Fajr, "h:mm A", "en"))) {
      nextPryarIndex = 0;
    } else if (momentNow.isBefore(moment(timings.Dhuhr, "h:mm A", "en"))) {
      nextPryarIndex = 1;
    } else if (momentNow.isBefore(moment(timings.Asr, "h:mm A", "en"))) {
      nextPryarIndex = 2;
    } else if (momentNow.isBefore(moment(timings.Maghrib, "h:mm A", "en"))) {
      nextPryarIndex = 3;
    } else if (momentNow.isBefore(moment(timings.Isha, "h:mm A", "en"))) {
      nextPryarIndex = 4;
    } else {
      nextPryarIndex = 0;
    }
    setNextPryar(nextPryarIndex);

    const nextPrayrObject = prayerCards[nextPryarIndex];
    const nextPrayrTime = timings[nextPrayrObject.timingKey];

    // وهنا كمان ضفنا "en"
    let nextMoment = moment(nextPrayrTime, "h:mm A", "en");

    if (nextMoment.isBefore(momentNow)) {
      nextMoment.add(1, "day");
    }

    const remaining = nextMoment.diff(momentNow);
    const duration = moment.duration(remaining);

    setRemainingTime(
      `${duration.hours()}:${String(duration.minutes()).padStart(2, "0")}:${String(duration.seconds()).padStart(2, "0")}`,
    );
  }, [timings]);

  useEffect(() => {
    const interval = setInterval(() => {
      countDownTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownTimer]);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          textAlign: "center",
          px: { xs: 1, sm: 2 },
          mt: {
            xs: 10,
            sm: 6,
            md: 8,
          } /* هنا التعديل: مسافة كبيرة للموبايل، وصفر للشاشات الأكبر */,
        }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <div>
            <h2
              style={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)",
                margin: 0,
              }}
            >
              {today}
            </h2>
            <h1
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
                margin: "4px 0",
              }}
            >
              {cityNameArabic}
            </h1>
          </div>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <div>
            <h2
              style={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)",
                margin: 0,
              }}
            >
              متبقي حتي {prayerCards[nextPryar]?.title}
            </h2>
            <h1
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
                margin: "4px 0",
              }}
            >
              {remainingTime}
            </h1>
          </div>
        </Grid>
      </Grid>

      <Divider
        className="border-white! opacity-20!"
        sx={{ mb: "60px", mt: "60px", mx: "auto", width: "100%" }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Select City */}
        <Stack
          sx={{
            alignItems: "center",
            mb: { xs: 3, md: 0 },
            px: { xs: 1, sm: 0 },
            order: { xs: -1, md: 1 },
          }}
        >
          <FormControl
            sx={{
              justifyContent: "center",
              width: { xs: "80%", sm: "50%", md: "30%" },
              display: "flex",
            }}
          >
            <InputLabel id="demo-simple-select-label">المدينه</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={city}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 260,
                  },
                },
              }}
            >
              {availableCities.map((cityObj) => (
                <MenuItem key={cityObj.apiValue} value={cityObj.apiValue}>
                  {cityObj.nameArabic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        {/* Select City */}

        {/* PYREYER */}
        <Stack sx={{ order: { xs: 0, md: 0 } }}>
          <Pryar
            selectedCity={city}
            lat={selectedCityObj?.lat}
            lng={selectedCityObj?.lng}
            today={today}
            setToday={setToday}
            timings={timings}
            setTimings={setTimings}
            nextPrayerIndex={nextPryar}
          />
        </Stack>
        {/* PYREYER */}
      </Box>
    </>
  );
}
