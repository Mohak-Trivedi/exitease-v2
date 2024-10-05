import axios from "axios";

let holidaysMap = {
  US: {},
};

export default async (req, res, next) => {
  let year = req.body.lwd.split("-")[0];
  if (!(holidaysMap["US"] && holidaysMap["US"][year])) {
    try {
      // fetch holidays for the year
      let {
        data: {
          response: { holidays },
        },
      } = await axios.get(
        `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_API_KEY}&country=US&year=${year}`
      );
      holidaysMap["US"][year] = {};
      holidays
        .filter(({ type }) => type.includes("National holiday"))
        .forEach(({ date }) => (holidaysMap["US"][year][date.iso] = true));
      holidaysMap["US"][year] = Object.keys(holidaysMap["US"][year]);
      // holidaysMap['US'][year] = [
      // 	'2024-01-01', '2024-01-15',
      // 	'2024-02-19', '2024-05-27',
      // 	'2024-06-19', '2024-07-04',
      // 	'2024-09-02', '2024-10-14',
      // 	'2024-11-11', '2024-11-28',
      // 	'2024-12-25'
      // ];
    } catch (e) {
      res.status(500).json({
        error: "problem with fetching holidays",
      });
    }
  }
  try {
    if (holidaysMap["US"][year]?.includes(req.body.lwd)) {
      res.status(400).json({
        error: "lwd is on a holiday",
      });
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({
      error: "Error while checking calendar",
    });
  }
};
