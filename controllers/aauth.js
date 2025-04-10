const prisma = require('../prismaClient'); 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required!!!" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required!!!" });
    }

    const user = await prisma.user.findFirst({  
      where: {
        email: email
      }
    });

    if (user) {
      return res.status(400).json({ message: "Email already exists!!!" });
    }

 
    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: email,
        password: hashPassword
      }
    });

    res.send('Register Success');
  } catch (err) {
    console.log(err); 
    res.status(500).json({ message: "Server Error" });
  }
};

exports.logout = async (req, res) => {
  try {

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password Invalid' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getReportIssues = async (req, res) => {
  try {

    const report_id = parseInt(req.params.report_id);

    if (isNaN(report_id)) {
      return res.status(400).json({ message: 'Invalid report_id' });
    }

    const reporterWithIssues = await prisma.reporters.findUnique({
      where: {
        id: report_id,  
      },
      include: {
        Roade_issues: true,         
        Drainag_issues: true,       
        Electricity_issues: true,  
        Water_issues: true,         
        Health_issues: true       
      }
    });

    if (!reporterWithIssues) {
      return res.status(404).json({ message: `No reporter found with report_id: ${report_id}` });
    }

    res.json(reporterWithIssues);

  } catch (err) {
    console.error('Error occurred:', err); 
    res.status(500).json({ message: 'Server Error', error: err.message });  
  }
};
 
exports.ListL = async (req, res) => {
  try {
    const village = 'บ้านไผ่ล้อม'; 
   
    const roadIssues = await prisma.roade_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: village
        }
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

  
    const drainageIssues = await prisma.drainag_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: village
        }
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

    
    const electricityIssues = await prisma.electricity_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: village
        }
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

   
    const waterIssues = await prisma.water_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: village
        }
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

   
    const healthIssues = await prisma.health_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: village
        }
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

    
    const roadIssuesCount = roadIssues.length;
    const drainageIssuesCount = drainageIssues.length;
    const electricityIssuesCount = electricityIssues.length;
    const waterIssuesCount = waterIssues.length;
    const healthIssuesCount = healthIssues.length;

    
    const result = {
      roadIssues: { count: roadIssuesCount, status: "ยังไม่ได้รับการแก้ไข" },
      drainageIssues: { count: drainageIssuesCount, status: "ยังไม่ได้รับการแก้ไข" },
      electricityIssues: { count: electricityIssuesCount, status: "ยังไม่ได้รับการแก้ไข" },
      waterIssues: { count: waterIssuesCount, status: "ยังไม่ได้รับการแก้ไข" },
      healthIssues: { count: healthIssuesCount, status: "ยังไม่ได้รับการแก้ไข" }
    };

   
    const sortedResults = Object.entries(result).sort((a, b) => b[1].count - a[1].count);

 
    res.status(200).json(Object.fromEntries(sortedResults)); 

  } catch (err) {
    console.error(err);  
    res.status(500).json({ message: "Server Error" });  
  }
};

exports.Listng = async (req, res) => {
  try {
    const village = 'บ้านไผ่เงิน'; 

    const roadIssues = await prisma.roade_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: village
        }
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

    const drainageIssues = await prisma.drainag_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: village
        }
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

    const electricityIssues = await prisma.electricity_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: village
        }
      },
      orderBy: {
        update_at: 'desc'
      }
    });

    const waterIssues = await prisma.water_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: village
        }
      },
      orderBy: {
        update_at: 'desc'
      }
    });

    const healthIssues = await prisma.health_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: village
        }
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

    const roadIssuesCount = roadIssues.length;
    const drainageIssuesCount = drainageIssues.length;
    const electricityIssuesCount = electricityIssues.length;
    const waterIssuesCount = waterIssues.length;
    const healthIssuesCount = healthIssues.length;


    const result = {
      roadIssues: { count: roadIssuesCount, status: "ยังไม่ได้รับการแก้ไข" },
      drainageIssues: { count: drainageIssuesCount, status: "ยังไม่ได้รับการแก้ไข" },
      electricityIssues: { count: electricityIssuesCount, status: "ยังไม่ได้รับการแก้ไข" },
      waterIssues: { count: waterIssuesCount, status: "ยังไม่ได้รับการแก้ไข" },
      healthIssues: { count: healthIssuesCount, status: "ยังไม่ได้รับการแก้ไข" }
    };

   
    const sortedResults = Object.entries(result).sort((a, b) => b[1].count - a[1].count);

    res.status(200).json(Object.fromEntries(sortedResults));  

  } catch (err) {
    console.error(err);  
    res.status(500).json({ message: "Server Error" });  
  }
};

exports.AllProgress = async (req, res) => {
  try {
  
    const roadIssuesResolved = await prisma.roade_issues.findMany({
      where: {
        status: 'กำลังดำเนินการ',
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

   
    const drainageIssuesResolved = await prisma.drainag_issues.findMany({
      where: {
        status: 'กำลังดำเนินการ',
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

   
    const electricityIssuesResolved = await prisma.electricity_issues.findMany({
      where: {
        status: 'กำลังดำเนินการ',
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

   
    const waterIssuesResolved = await prisma.water_issues.findMany({
      where: {
        status: 'กำลังดำเนินการ',
      },
      orderBy: {
        update_at: 'desc' 
      }
    });


    const healthIssuesResolved = await prisma.health_issues.findMany({
      where: {
        status: 'กำลังดำเนินการ',
      },
      orderBy: {
        update_at: 'desc' 
      }
    });


    const roadIssuesResolvedCount = roadIssuesResolved.length;
    const drainageIssuesResolvedCount = drainageIssuesResolved.length;
    const electricityIssuesResolvedCount = electricityIssuesResolved.length;
    const waterIssuesResolvedCount = waterIssuesResolved.length;
    const healthIssuesResolvedCount = healthIssuesResolved.length;

    const result = {
      roadIssuesResolved: { count: roadIssuesResolvedCount, status: "กำลังดำเนินการ" },
      drainageIssuesResolved: { count: drainageIssuesResolvedCount, status: "กำลังดำเนินการ" },
      electricityIssuesResolved: { count: electricityIssuesResolvedCount, status: "กำลังดำเนินการ" },
      waterIssuesResolved: { count: waterIssuesResolvedCount, status: "กำลังดำเนินการ" },
      healthIssuesResolved: { count: healthIssuesResolvedCount, status: "กำลังดำเนินการ" }
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.submitReport = async (req, res) => {
  console.log("Received Body:", JSON.stringify(req.body, null, 2));
  try {
    const { village, fullname, phone, province, district, subdistrict, problemCategory, ...problemData } = req.body;

    if (!problemCategory || !Array.isArray(problemCategory)){
      return res.status(400).json({ message: "Problem category is required!"});
    }

    const reporter = await prisma.reporters.create({
      data: {
        fullname: fullname,
        phone: phone,
        village: village,
        province: province,       
        district: district,       
        subdistrict: subdistrict, 
      },
    });

    for (const category of problemCategory) {
      let categoryData = {};
    
      if (category === 'roade' && problemData.roade?.sub_issue && problemData.roade?.severity && problemData.roade?.status  
        && problemData.roade?.urgency && problemData.roade?.economic_impact) {
        categoryData = {
          report_id: reporter.id,
          sub_issue: problemData.roade.sub_issue, 
          severity: problemData.roade.severity,  
          description: problemData.roade.description, 
          status: problemData.roade.status || "ยังไม่ได้รับการแก้ไข", 
          image_url: problemData.roade.image_url|| null, 
          urgency: problemData.roade.urgency || 0, 
          economic_impact: problemData.roade.economic_impact || 0,
          affected_people: 1,
          total_score: 
            (parseInt(problemData.roade.severity)*0.4)+
            (parseInt(problemData.roade.urgency)*0.3)+
            (parseInt(problemData.roade.economic_impact)*0.1),
          update_at: new Date() 
        };
        await prisma.roade_issues.create({ data: categoryData });
      }
      else if (category === 'drainag' && problemData.drainag?.sub_issue && problemData.drainag?.severity 
        && problemData.drainag?.status  && problemData.drainag?.urgency && problemData.drainag?.economic_impact) {
        categoryData = {
          report_id: reporter.id,
          sub_issue: problemData.drainag.sub_issue, 
          severity: problemData.drainag.severity,
          description: problemData.drainag.description,
          status: problemData.drainag.status || "ยังไม่ได้รับการแก้ไข",
          image_url: problemData.drainag.image_url || null,
          urgency: problemData.drainag.urgency || 0,
          economic_impact: problemData.drainag.economic_impact || 0,
          affected_people: 1,
          total_score:  
            (parseInt(problemData.drainag.severity)*0.4)+
            (parseInt(problemData.drainag.urgency)*0.3)+
            (parseInt(problemData.drainag.economic_impact)*0.1),
          update_at: new Date() 
        };
        await prisma.drainag_issues.create({ data: categoryData });
      }
      else if (category === 'electricity' && problemData.electricity?.sub_issue && problemData.electricity?.severity
        && problemData.electricity?.status  && problemData.electricity?.urgency && problemData.electricity?.economic_impact
      ) {
        categoryData = {
          report_id: reporter.id,
          sub_issue: problemData.electricity.sub_issue,
          severity: problemData.electricity.severity,
          description: problemData.electricity.description,
          status: problemData.electricity.status || "ยังไม่ได้รับการแก้ไข",
          image_url: problemData.electricity.image_url || null,
          urgency: problemData.electricity.urgency || 0,
          economic_impact: problemData.electricity.economic_impact || 0,
          affected_people: 1,
          total_score: 
            (parseInt(problemData.electricity.severity)*0.4)+
            (parseInt(problemData.electricity.urgency)*0.3)+
            (parseInt(problemData.electricity.economic_impact)*0.1),
          update_at: new Date() 
        };
        await prisma.electricity_issues.create({ data: categoryData });
      }
      else if (category === 'water' && problemData.water?.sub_issue && problemData.water.severity 
        && problemData.water?.status  && problemData.water?.urgency && problemData.water?.economic_impact
      ) {
        categoryData = {
          report_id: reporter.id,
          sub_issue: problemData.water.sub_issue,
          severity: problemData.water.severity,
          description: problemData.water.description,
          status: problemData.water.status || "ยังไม่ได้รับการแก้ไข",
          image_url: problemData.water.image_url || null,
          urgency: problemData.water.urgency || 0,
          economic_impact: problemData.water.economic_impact || 0,
          affected_people: 1,
          total_score: 
            (parseInt(problemData.water.severity)*0.4)+
            (parseInt(problemData.water.urgency)*0.3)+
            (parseInt(problemData.water.economic_impact)*0.1),
          update_at: new Date()

        };
        await prisma.water_issues.create({ data: categoryData });
      }
      else if (category === 'health' && problemData.health?.sub_issue && problemData.health.severity
        && problemData.health?.status  && problemData.health?.urgency && problemData.health?.economic_impact
      ) {
        categoryData = {
          report_id: reporter.id,
          sub_issue: problemData.health.sub_issue,
          severity: problemData.health.severity,
          description: problemData.health.description,
          status: problemData.health.status || "ยังไม่ได้รับการแก้ไข",
          image_url: problemData.health.image_url || null,
          urgency: problemData.health.urgency || 0,
          economic_impact: problemData.health.economic_impact || 0,
          affected_people: 1,
          total_score: 
            (parseInt(problemData.health.severity)*0.4)+
            (parseInt(problemData.health.urgency)*0.3)+
            (parseInt(problemData.health.economic_impact)*0.1),
          update_at: new Date() 
        };
        await prisma.health_issues.create({ data: categoryData });
      }
      else {
        console.log(`⚠️ No valid data for ${category}, skipping.`);
      }
    }

    res.status(200).json({ message: "✅ Report submitted successfully!" });
    
  } catch (err) {
    console.error(err);  
    res.status(500).json({ message: "Server Error" });  
  }
};

exports.AllSucceed = async (req, res) => {
  try {
  
    const roadIssuesResolved = await prisma.roade_issues.findMany({
      where: {
        status: 'แก้ไขสำเร็จแล้ว',
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

   
    const drainageIssuesResolved = await prisma.drainag_issues.findMany({
      where: {
        status: 'แก้ไขสำเร็จแล้ว',
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

    const electricityIssuesResolved = await prisma.electricity_issues.findMany({
      where: {
        status: 'แก้ไขสำเร็จแล้ว',
      },
      orderBy: {
        update_at: 'desc' 
      }
    });


    const waterIssuesResolved = await prisma.water_issues.findMany({
      where: {
        status: 'แก้ไขสำเร็จแล้ว',
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

    const healthIssuesResolved = await prisma.health_issues.findMany({
      where: {
        status: 'แก้ไขสำเร็จแล้ว',
      },
      orderBy: {
        update_at: 'desc' 
      }
    });

    const roadIssuesResolvedCount = roadIssuesResolved.length;
    const drainageIssuesResolvedCount = drainageIssuesResolved.length;
    const electricityIssuesResolvedCount = electricityIssuesResolved.length;
    const waterIssuesResolvedCount = waterIssuesResolved.length;
    const healthIssuesResolvedCount = healthIssuesResolved.length;

    const result = {
      roadIssuesResolved: { count: roadIssuesResolvedCount, status: "แก้ไขสำเร็จแล้ว" },
      drainageIssuesResolved: { count: drainageIssuesResolvedCount, status: "แก้ไขสำเร็จแล้ว" },
      electricityIssuesResolved: { count: electricityIssuesResolvedCount, status: "แก้ไขสำเร็จแล้ว" },
      waterIssuesResolved: { count: waterIssuesResolvedCount, status: "แก้ไขสำเร็จแล้ว" },
      healthIssuesResolved: { count: healthIssuesResolvedCount, status: "แก้ไขสำเร็จแล้ว" }
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};




