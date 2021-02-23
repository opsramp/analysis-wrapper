import IndoorBike from "assets/lottie/workouts/01_Indoor_Bike.json"
import Elliptical from "assets/lottie/workouts/02_Eliptical.json"
import IndoorRun from "assets/lottie/workouts/03_Indoor_Run.json"
import IndoorWalk from "assets/lottie/workouts/04_Indoor_Walk.json"
import JumpingRope from "assets/lottie/workouts/05_Jumping-Rope.json"
import HIITWorkout from "assets/lottie/workouts/06_Hit.json"
import Dance from "assets/lottie/workouts/07_Dance.json"
import Boxing from "assets/lottie/workouts/08_Boxing.json"
import Weight from "assets/lottie/workouts/09_Weight.json"
import Core from "assets/lottie/workouts/10_Core.json"
import Cross from "assets/lottie/workouts/11_Cross.json"
import Yoga from "assets/lottie/workouts/12_Yoga.json"
import Pilate from "assets/lottie/workouts/13_Pilates.json"

export const WORKOUTS = [
  { category: "Cardio", title: "Indoor Bike", icon: IndoorBike },
  { category: "Cardio", title: "Elliptical", icon: Elliptical },
  { category: "Cardio", title: "Indoor Run", icon: IndoorRun },
  { category: "Cardio", title: "Indoor Walk", icon: IndoorWalk },
  { category: "Cardio", title: "Jump Rope", icon: JumpingRope },
  { category: "Cardio", title: "HIIT Workout", icon: HIITWorkout },
  { category: "Cardio", title: "Dance", icon: Dance },
  { category: "Cardio", title: "Boxing", icon: Boxing },
  { category: "Strength Training", title: "Weight Training", icon: Weight },
  { category: "Strength Training", title: "Core Training", icon: Core },
  { category: "Strength Training", title: "Cross Training", icon: Cross },
  { category: "Balance, Co-ordination, Flexibility", title: "Yoga", icon: Yoga },
  {
    category: "Balance, Co-ordination, Flexibility",
    title: "Pilates",
    icon: Pilate,
  },
]

export const CERTIFICATES = [
  { value: "ACSM", label: "American College of Sports Medicine (ACSM) Certified" },
  { value: "ACE", label: "American Council On Exercise (ACE) Certified " },
  {
    value: "NSCA",
    label: "National Strength and Conditioning Association (NSCA) Certified",
  },
  { value: "NASM", label: "National Academy of Sports Medicine (NASM) Certified" },
  {
    value: "ISSM",
    label: "International Sports Sciences Association (ISSM) Certified",
  },
]

export const TRAININGS = WORKOUTS.map((wo) => ({ value: wo.title, label: wo.title }))

export const TIMEZONES = [
  { label: "Eastern Daylight Time - Washington DC (GMT-4)", value: "EDT" },
  { label: "Central Daylight Time Chicago (GMT-5)", value: "CDT" },
  { label: "Mountain Daylight Time Denver(GMT-6)", value: "MDT" },
  { label: "Mountain Standard Time Phoenix (GMT-7)", value: "MST" },
  { label: "Pacific Daylight Time - Los Angeles (GMT-7)", value: "PDT" },
  { label: "Alaska Daylight Time Anchorage (GMT-8)", value: "ADT" },
  { label: "Hawaii-Aleutian Standard Time Honolulu(GMT-10)", value: "HAST" },
]

export const TIMEZONE_TZ = {
  EDT: "America/New_York",
  CDT: "America/Chicago",
  MDT: "America/Denver",
  MST: "America/Phoenix",
  PDT: "America/Los_Angeles",
  ADT: "America/Anchorage",
  HAST: "Pacific/Honolulu",
}

export const TIMEZONE_TZ_INVERSE = {
  "America/New_York": 'EDT',
  "America/Chicago": 'CDT',
  "America/Denver": 'MDT',
  "America/Phoenix": 'MST',
  "America/Los_Angeles": 'PDT',
  "America/Anchorage": 'ADT',
  "Pacific/Honolulu": 'HAST',
}

export const TIME_OPTIONS = [
  { label: "30 min", value: 30 },
  { label: "60 min", value: 60 },
  { label: "90 min", value: 90 },
]

export const CHARGE_MARKS = {
  5: "$5",
  10: "$10",
  15: "$15",
  20: "$20",
  25: "$25",
  30: "$30",
  35: "$35",
  40: "$40",
  45: "$45",
  50: "$50",
  55: "$55",
  60: "$60",
}

export const STATES = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
]
