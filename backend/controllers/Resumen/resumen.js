const moment = require("moment");
const { Op } = require("sequelize");
const Database = require("../../config/connection");
const Appointment = Database.appointment;
const Pet = Database.pet;
const User = Database.user;
const Owner = Database.owner;
const Product = Database.product;
const Payment = Database.payment;

const dashboardSummaryData = async (req, res) => {
  try {
    const requestedMonth = parseInt(req.query.month) || new Date().getMonth() + 1;
    console.log("requestedMonth", requestedMonth);

    // appointment =========

    const appointments = await Appointment.findAll({});

    const filteredAppointments = appointments.filter((record) => {
      const createdDate = new Date(record.createdAt);
      console.log("createdDate", createdDate);
      return createdDate.getMonth() + 1 === requestedMonth;
    });
    const totalRecords = filteredAppointments.length;
    const pendingRecords = filteredAppointments.filter((appointment) => appointment?.status === "pending").length;

    const noAttemptRecords = filteredAppointments.filter((appointment) => appointment?.status === "no attempt").length;

    // pets =========
    const pets = await Pet.findAll({});
    const filteredAppointmentsPets = pets.filter((record) => {
      const createdDate = new Date(record.createdAt);
      console.log("createdDate", createdDate);
      return createdDate.getMonth() + 1 === requestedMonth;
    });
    const totalRecordsPets = filteredAppointmentsPets.length;

    const macho = filteredAppointmentsPets.filter((ele) => ele.sex.toLowerCase() === "macho").length;

    const hembra = filteredAppointmentsPets.filter((ele) => ele.sex.toLowerCase() === "hembra").length;

    // products =========

    const products = await Product.findAll({});
    const filteredAppointmentsProducts = products.filter((record) => {
      const createdDate = new Date(record.createdAt);
      console.log("createdDate", createdDate);
      return createdDate.getMonth() + 1 === requestedMonth;
    });
    const totalRecordsProducts = filteredAppointmentsProducts.length;

    const OutStock = filteredAppointmentsProducts.filter((ele) => ele.stock <= 0).length;

    const InStock = filteredAppointmentsProducts.filter((ele) => ele.stock >= 0).length;

    // users =========

    const users = await User.findAll({});
    const filteredAppointmentsUsers = users.filter((record) => {
      const createdDate = new Date(record.createdAt);
      console.log("createdDate", createdDate);
      return createdDate.getMonth() + 1 === requestedMonth;
    });
    const totalRecordsUsers = filteredAppointmentsUsers.length;

    const admin = filteredAppointmentsUsers.filter((ele) => ele.role === "masterAdmin").length;

    const serviceCenter = filteredAppointmentsUsers.filter((ele) => ele.role === "customerService").length;

    res.status(200).send({
      message: "dashboard summary",
      appointment: { totalRecords, pendingRecords, noAttemptRecords },
      pets: { totalRecordsPets, macho, hembra },
      products: { totalRecordsProducts, OutStock, InStock },
      users: { totalRecordsUsers, admin, serviceCenter },
    });
  } catch (error) {
    console.error("Error fetching appointment data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const appointmentGraph = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({});
    const requestedMonth = parseInt(req.query.month) || new Date().getMonth() + 1;
    const currentDate = new Date();

    const categorizedAppointments = {
      currentMonth: [],
      currentWeek: [],
    };

    const weeklyData = [];

    for (const record of appointments) {
      const createdDate = new Date(record.createdAt);
      if (createdDate.getMonth() + 1 === requestedMonth) {
        categorizedAppointments.currentMonth.push(record);
        if (isDateInCurrentWeek(createdDate, currentDate)) {
          categorizedAppointments.currentWeek.push(record);
        }
      }
    }

    const weekData = {};
    for (const record of categorizedAppointments.currentMonth) {
      const createdDate = new Date(record.createdAt);
      const weekNumber = getWeekNumber(createdDate);
      if (!weekData[weekNumber]) {
        weekData[weekNumber] = 0;
      }
      weekData[weekNumber]++;
    }
    let weekCount = 1;
    for (const weekNumber in weekData) {
      const week = {
        week: weekData[weekNumber],
      };
      weeklyData.push(week);
      weekCount++;
    }

    const data = {
      currentWeek: categorizedAppointments.currentWeek.length,
      currentMonth: categorizedAppointments.currentMonth.length,
    };

    res.status(200).send({
      message: "Appointment summary",
      data,
      weeklyData,
    });
  } catch (error) {
    console.error("Error fetching appointment data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const paymentGraph = async (req, res) => {
  try {
    const payments = await Payment.findAll({});

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const sixMonthsAgo = new Date(currentDate);
    sixMonthsAgo.setMonth(currentMonth - 5);

    const currentMonthPayments = payments.filter((payment) => {
      const paymentDate = new Date(payment.createdAt);
      return paymentDate.getFullYear() === currentYear && paymentDate.getMonth() === currentMonth;
    });

    const currentYearPayments = payments.filter((payment) => {
      const paymentDate = new Date(payment.createdAt);
      return paymentDate.getFullYear() === currentYear;
    });

    const lastSixMonthsData = [];
    const lastYearLastSixMonthsData = [];
    const currentMonthTotalAmount = currentMonthPayments.reduce((total, payment) => total + payment.final_amount, 0);
    const currentYearTotalAmount = currentYearPayments.reduce((total, payment) => total + payment.final_amount, 0);

    for (let i = 0; i < 6; i++) {
      const monthDate = new Date(currentDate);
      const lastYearMonthDate = new Date(currentDate);
      monthDate.setMonth(currentMonth - i);
      lastYearMonthDate.setMonth(currentMonth - i);
      lastYearMonthDate.setFullYear(currentYear - 1);

      const month = monthDate.toLocaleString("en-US", { month: "long" });
      const year = monthDate.getFullYear();
      const lastYear = lastYearMonthDate.getFullYear();

      const totalAmount = payments
        .filter((payment) => {
          const paymentDate = new Date(payment.createdAt);
          return paymentDate.getFullYear() === year && paymentDate.getMonth() === monthDate.getMonth();
        })
        .reduce((total, payment) => total + payment.final_amount, 0);

      const lastYearTotalAmount = payments
        .filter((payment) => {
          const paymentDate = new Date(payment.createdAt);
          return paymentDate.getFullYear() === year && paymentDate.getMonth() === monthDate.getMonth();
        })
        .reduce((total, payment) => total + payment.final_amount, 0);

      lastSixMonthsData.push({ month, totalAmount });
      lastYearLastSixMonthsData.push({ month, lastYearTotalAmount });
    }

    res.status(200).send({
      message: "Payments",
      currentMonthData: currentMonthTotalAmount,
      currentYearData: currentYearTotalAmount,
      lastSixMonthsData: lastSixMonthsData.reverse(),
      lastYearLastSixMonthsData: lastYearLastSixMonthsData.reverse(),
    });
  } catch (error) {
    console.error("Error fetching payment data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const ownerGraph = async (req, res) => {
  const owners = await Owner.findAll({ attributes: ["dob"] });

  const now = new Date();
  const currentYear = now.getFullYear();

  const ageGroups = {
    "5-10 years": 0,
    "11-20 years": 0,
    "21-30 years": 0,
    "31-45 years": 0,
    "46+ years": 0,
  };

  owners.forEach((owner) => {
    const dob = new Date(owner.dob);
    const ownerAge = currentYear - dob.getFullYear();

    if (ownerAge >= 5 && ownerAge <= 10) {
      ageGroups["5-10 years"]++;
    } else if (ownerAge >= 11 && ownerAge <= 20) {
      ageGroups["11-20 years"]++;
    } else if (ownerAge >= 21 && ownerAge <= 30) {
      ageGroups["21-30 years"]++;
    } else if (ownerAge >= 31 && ownerAge <= 45) {
      ageGroups["31-45 years"]++;
    } else if (ownerAge > 45) {
      ageGroups["46+ years"]++;
    }
  });
  const totalOwners = Object.values(ageGroups).reduce((total, count) => total + count, 0);

  // Calculate percentages for each age group
  const ageGroupPercentages = [];
  for (const ageGroup in ageGroups) {
    const percentage = ((ageGroups[ageGroup] / totalOwners) * 100).toFixed(2);
    ageGroupPercentages.push({
      data: ageGroup,
      total: ageGroups[ageGroup],
      percentage: percentage.replace(/\.00$/, "") + "%",
    });
  }
  res.status(200).send({
    message: "ownerGraph",
    ageGroupPercentages,
  });
};

const pendingAppointments = async (req, res) => {
  const appointments = await Appointment.findAll({
    where: { status: "pending" },
  });
  res.status(200).send({
    message: "pending appointments",
    appointments,
  });
};

//------------- Vets ------------- //

const monthlyMetrics = async (req, res) => {
  try {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();
    const veterinarianId = req.params.veterinarianId;

    const appointments = await Appointment.findAll({
      where: {
        veterinarianId: veterinarianId,
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    const owners = await Owner.findAndCountAll({
      where: {
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    const veterinarians = await Appointment.findAll({
      where: { veterinarianId: veterinarianId },
      attributes: ["ownerId"],
    });

    const matchedOwners = owners.rows.filter((owner) => veterinarians.some((vet) => vet.ownerId === owner.id)).map(({ id }) => ({ id }));

    const pendingCount = appointments.filter((appointment) => appointment.status === "pending").length;

    const noAttemptCount = appointments.filter((appointment) => appointment.status === "no attempt").length;

    res.status(200).send({
      message: "Monthly Metrics",
      data: {
        pendingCount,
        totalCount: appointments.length,
        noAttemptCount,
        ownerRecords: matchedOwners.length,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const appointmentGraphVets = async (req, res) => {
  try {
    const id = req.params.veterinarianId;
    const appointments = await Appointment.findAll({ where: { veterinarianId: id } });
    const requestedMonth = parseInt(req.query.month) || new Date().getMonth() + 1;
    const currentDate = new Date();

    const categorizedAppointments = {
      currentMonth: [],
      currentWeek: [],
    };

    const weeklyData = [];

    for (const record of appointments) {
      const createdDate = new Date(record.createdAt);
      if (createdDate.getMonth() + 1 === requestedMonth) {
        categorizedAppointments.currentMonth.push(record);
        if (isDateInCurrentWeek(createdDate, currentDate)) {
          categorizedAppointments.currentWeek.push(record);
        }
      }
    }

    const weekData = {};
    for (const record of categorizedAppointments.currentMonth) {
      const createdDate = new Date(record.createdAt);
      const weekNumber = getWeekNumber(createdDate);
      if (!weekData[weekNumber]) {
        weekData[weekNumber] = 0;
      }
      weekData[weekNumber]++;
    }
    let weekCount = 1;
    for (const weekNumber in weekData) {
      const week = {
        week: weekData[weekNumber],
      };
      weeklyData.push(week);
      weekCount++;
    }

    res.status(200).send({
      message: "vets Appointment summary",

      weeklyData,
    });
  } catch (error) {
    console.error("Error fetching appointment data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

function isDateInCurrentWeek(date, currentDate) {
  const firstDayOfWeek = 0;
  const currentWeek = getWeekNumber(currentDate);
  const weekOfDate = getWeekNumber(date);
  return weekOfDate === currentWeek;
}

function getWeekNumber(date) {
  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());
  const diff = currentDate - new Date(currentDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil((diff / 86400000 + 1) / 7);
  return weekNumber;
}

const appointmentsByDate = async (req, res) => {
  try {
    const veterinarianId = req.params.veterinarianId;
    const date = moment(req.query.date).format("YYYY-MM-DD"); // Format the input date

    const appointments = await Appointment.findAll({
      where: {
        veterinarianId: veterinarianId,
      },
    });

    // Filter appointments based on the formatted date
    const filteredAppointments = appointments.filter((appointment) => moment(appointment.createdAt).format("YYYY-MM-DD") === date);

    if (filteredAppointments.length > 0) {
      res.status(200).json({
        message: "Appointments list",
        appointments: filteredAppointments,
      });
    } else {
      res.status(200).json({
        message: "No matching appointments found",
        appointments: [],
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




const ownersAgeGraph = async (req, res) => {
  try {
    const veterinarians = await Appointment.findAll({
      where: { veterinarianId: req.params.veterinarianId },
      attributes: ["ownerId"],
    });

    const owners = await Owner.findAll({});
    const matchedOwners = filterOwnersByVeterinarians(owners, veterinarians);

    const ageGroups = initializeAgeGroups();

    countOwnersByAgeGroup(matchedOwners, ageGroups);

    const totalOwners = calculateTotalOwners(ageGroups);
    const ageGroupPercentages = calculateAgeGroupPercentages(ageGroups, totalOwners);

    res.status(200).send({
      message: "Owners matched by veterinarian with age groups",
      ageGroupPercentages,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

function filterOwnersByVeterinarians(owners, veterinarians) {
  return owners
    .filter((owner) => veterinarians.some((vet) => vet.ownerId === owner.id))
    .map(({ dob }) => ({
      dob,
      age: getAge(dob),
    }));
}

function initializeAgeGroups() {
  return {
    "5-10 years": 0,
    "11-20 years": 0,
    "21-30 years": 0,
    "31-45 years": 0,
    "46+ years": 0,
  };
}

function countOwnersByAgeGroup(matchedOwners, ageGroups) {
  matchedOwners.forEach((owner) => {
    const age = owner.age;

    if (age >= 5 && age <= 10) {
      ageGroups["5-10 years"]++;
    } else if (age >= 11 && age <= 20) {
      ageGroups["11-20 years"]++;
    } else if (age >= 21 && age <= 30) {
      ageGroups["21-30 years"]++;
    } else if (age >= 31 && age <= 45) {
      ageGroups["31-45 years"]++;
    } else if (age > 45) {
      ageGroups["46+ years"]++;
    }
  });
}

function calculateTotalOwners(ageGroups) {
  return Object.values(ageGroups).reduce((total, count) => total + count, 0);
}

function calculateAgeGroupPercentages(ageGroups, totalOwners) {
  const ageGroupPercentages = [];

  for (const ageGroup in ageGroups) {
    const percentage = ((ageGroups[ageGroup] / totalOwners) * 100).toFixed(2);
    ageGroupPercentages.push({
      data: ageGroup,
      total: ageGroups[ageGroup],
      percentage: percentage.replace(/\.00$/, "") + "%",
    });
  }

  return ageGroupPercentages;
}

// Helper function to calculate age from date of birth
function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}




module.exports = {
  dashboardSummaryData,
  paymentGraph,
  ownerGraph,
  pendingAppointments,
  appointmentGraph,
  monthlyMetrics,
  appointmentGraphVets,
  ownersAgeGraph,
  appointmentsByDate,
};
