import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from '../models/stats.js';

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if(!name || !email || !message) {
    return next(new ErrorHandler("All fields are mandatory", 400));
  }

  const to = process.env.MY_MAIL;
  const subject = "Contact from CollegeNotes";
  const text = `I am ${name} and my e-mail is ${email}.\n\n ${message}`;

  await sendEmail(to, subject, text);

  res
    .status(200)
    .json({
      success: true,
      message: "Your message has been sent"
    })
})

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);
  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }
  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      views: 0
    })
  }

  const usersCount = statsData[11].users;
  const viewsCount = statsData[11].views;

  let usersProfit = true, viewsProfit = true;
  let usersChange = 0, viewsChange = 0;

  if(statsData[10].users === 0) usersChange = usersCount * 100;
  if(statsData[10].views === 0) viewsChange = viewsCount * 100;

  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views
    };

    usersChange = (difference.users / statsData[10].users) * 100;
    viewsChange = (difference.views / statsData[10].views) * 100;

    if(usersChange < 0) usersProfit = false;
    if(viewsChange < 0) viewsProfit = false;
  }

  res
    .status(200)
    .json({
      success: true,
      stats: statsData,
      usersCount,
      viewsCount,
      usersChange,
      viewsChange,
      usersProfit,
      viewsProfit
    })
})
