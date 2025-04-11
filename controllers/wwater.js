const prisma = require('../prismaClient'); 

 exports.WListlf = async (req, res) => {
   try {
     const issues = await prisma.water_issues .groupBy({
       by: ['sub_issue', 'status'],
       where: {
         status: 'ยังไม่ได้รับการแก้ไข', 
         Reporters: {
           village: 'บ้านไผ่ล้อม' 
         }
       },
       _count: {
         sub_issue: true 
       },
       orderBy: {
         _count: {
           sub_issue: 'desc'
         }
       }
     });
 
    
     const result = issues.map(issue => {
       const count = issue._count.sub_issue;
 
       let B_value = 0;
       if (count >= 1 && count <= 20) {
         B_value = 1;
       } else if (count >= 21 && count <= 50) {
         B_value = 2;
       } else if (count >= 51 && count <= 100) {
         B_value = 3;
       } else if (count >= 101 && count <= 150) {
         B_value = 4;
       } else if (count >= 151) {
         B_value = 5;
       }
 
       const total_score = (B_value * 0.3) + (count * 0.4);
 
       return {
         sub_issue: issue.sub_issue,
         status: issue.status,
         count: count,
         total_score: total_score.toFixed(2)
       };
     });
 
     
     res.json(result);
 
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server Error' });
   }
 };

 exports.WListNG = async (req, res) => {
   try {
     const issues = await prisma.water_issues .groupBy({
       by: ['sub_issue', 'status'],
       where: {
         status: 'ยังไม่ได้รับการแก้ไข', 
         Reporters: {
           village: 'บ้านไผ่เงิน'
         }
       },
       _count: {
         sub_issue: true 
       },
       orderBy: {
         _count: {
           sub_issue: 'desc' 
         }
       }
     });
 
     
     const result = issues.map(issue => {
       const count = issue._count.sub_issue;
 
       let B_value = 0;
       if (count >= 1 && count <= 20) {
         B_value = 1;
       } else if (count >= 21 && count <= 50) {
         B_value = 2;
       } else if (count >= 51 && count <= 100) {
         B_value = 3;
       } else if (count >= 101 && count <= 150) {
         B_value = 4;
       } else if (count >= 151) {
         B_value = 5;
       }
 
       const total_score = (B_value * 0.3) + (count * 0.4);
 
       return {
         sub_issue: issue.sub_issue,
         status: issue.status,
         count: count,
         total_score: total_score.toFixed(2)
       };
     });
 
    
     res.json(result);
 
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server Error' });
   }
 };

 exports.WListlsuesf = async (req, res) => {
   try {
     const issues = await prisma.water_issues .findMany({
       where: {
         status: "ยังไม่ได้รับการแก้ไข",
         Reporters: {
           village: "บ้านไผ่ล้อม"
         }
       },
       select: {
         sub_issue: true,
         description: true,
         status: true,
         update_at: true  
       },
       orderBy: {
         update_at: "desc", 
       }
     });
 
     
     const groupedResults = {};
 
     issues.forEach(issue => {
       const subIssue = issue.sub_issue;
       if (!groupedResults[subIssue]) {
         groupedResults[subIssue] = [];
       }
       groupedResults[subIssue].push({
         sub_issue: issue.sub_issue,
         description: issue.description,
         status: issue.status,
         update_at: issue.update_at
       });
     });
 
     
     res.json(groupedResults);
 
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server Error' });
   }
 };

 exports.WListlsuesfNG = async (req, res) => {
   try {
     const issues = await prisma.water_issues .findMany({
       where: {
         status: "ยังไม่ได้รับการแก้ไข",
         Reporters: {
           village: "บ้านไผ่เงิน"
         }
       },
       select: {
         sub_issue: true,
         description: true,
         status: true,
         update_at: true  
       },
       orderBy: {
         update_at: "desc",  
       }
     });
 
     
     const groupedResults = {};
 
     issues.forEach(issue => {
       const subIssue = issue.sub_issue;
       if (!groupedResults[subIssue]) {
         groupedResults[subIssue] = [];
       }
       groupedResults[subIssue].push({
         sub_issue: issue.sub_issue,
         description: issue.description,
         status: issue.status,
         update_at: issue.update_at
       });
     });
 
     
     res.json(groupedResults);
 
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server Error' });
   }
 };

 exports.WProgressL = async (req, res) => {
   try {
     const issues = await prisma.water_issues .groupBy({
       by: ['sub_issue', 'status'],
       where: {
         status: 'กำลังดำเนินการ', 
         Reporters: {
           village: 'บ้านไผ่ล้อม' 
         }
       },
       _count: {
         sub_issue: true 
       },
       orderBy: {
         _count: {
           sub_issue: 'desc' 
         }
       }
     });
 
    
     const result = issues.map(issue => {
       const count = issue._count.sub_issue;
 
       let B_value = 0;
       if (count >= 1 && count <= 20) {
         B_value = 1;
       } else if (count >= 21 && count <= 50) {
         B_value = 2;
       } else if (count >= 51 && count <= 100) {
         B_value = 3;
       } else if (count >= 101 && count <= 150) {
         B_value = 4;
       } else if (count >= 151) {
         B_value = 5;
       }
 
       const total_score = (B_value * 0.3) + (count * 0.4);
 
       return {
         sub_issue: issue.sub_issue,
         status: issue.status,
         count: count,
         total_score: total_score.toFixed(2)
       };
     });
 
     
     res.json(result);
 
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server Error' });
   }
 };

 exports.WProgressAll = async (req, res) => {
  try {
    const issues = await prisma.water_issues.groupBy({
      by: ['sub_issue', 'status'],
      where: {
        status: 'กำลังดำเนินการ', 
      },
      _count: {
        sub_issue: true 
      },
      orderBy: {
        _count: {
          sub_issue: 'desc' 
        }
      }
    });

  
    const result = issues.map(issue => {
      const count = issue._count.sub_issue;

      let B_value = 0;
      if (count >= 1 && count <= 20) {
        B_value = 1;
      } else if (count >= 21 && count <= 50) {
        B_value = 2;
      } else if (count >= 51 && count <= 100) {
        B_value = 3;
      } else if (count >= 101 && count <= 150) {
        B_value = 4;
      } else if (count >= 151) {
        B_value = 5;
      }

      const total_score = (B_value * 0.3) + (count * 0.4);

      return {
        sub_issue: issue.sub_issue,
        status: issue.status,
        count: count,
        total_score: total_score.toFixed(2)
      };
    });

    
    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

 exports.WProgressL2 = async (req, res) => {
  try {
   
    const issues = await prisma.water_issues.findMany({
      where: {
        status: 'กำลังดำเนินการ',
        Reporters: {
          village: 'บ้านไผ่ล้อม'
        }
      },
      select: {
        sub_issue: true,
        description: true,  
        resolution_detail: true,  
        status: true,  
        update_at: true,  
        Reporters: {
          select: {
            fullname: true  
          }
        }
      },
      orderBy: {
        update_at: 'desc',  
      }
    });

   
    const groupedResults = {};

    issues.forEach(issue => {
      const subIssue = issue.sub_issue;
      if (!groupedResults[subIssue]) {
        groupedResults[subIssue] = [];
      }
     
      groupedResults[subIssue].push({
        sub_issue: issue.sub_issue,
        description: issue.description,  
        resolution_detail: issue.resolution_detail,  
        status: issue.status, 
        updated_at: issue.update_at,  
        reporter_fullname: issue.Reporters.fullname 
      });
    });

    
    res.json(groupedResults);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

 exports.WProgressNG2 = async (req, res) => {
  try {
    
    const issues = await prisma.water_issues.findMany({
      where: {
        status: 'กำลังดำเนินการ',
        Reporters: {
          village: 'บ้านไผ่เงิน'
        }
      },
      select: {
        sub_issue: true,
        description: true,  
        resolution_detail: true,  
        status: true,  
        update_at: true, 
        Reporters: {
          select: {
            fullname: true 
          }
        }
      },
      orderBy: {
        update_at: 'desc',  
      }
    });

    
    const groupedResults = {};

    issues.forEach(issue => {
      const subIssue = issue.sub_issue;
      if (!groupedResults[subIssue]) {
        groupedResults[subIssue] = [];
      }
    
      groupedResults[subIssue].push({
        sub_issue: issue.sub_issue,
        description: issue.description,  
        resolution_detail: issue.resolution_detail,  
        status: issue.status, 
        updated_at: issue.update_at,  
        reporter_fullname: issue.Reporters.fullname 
      });
    });

  
    res.json(groupedResults);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.WSucceedL = async (req, res) => {
   try {
     const issues = await prisma.water_issues .groupBy({
       by: ['sub_issue', 'status'],
       where: {
         status: 'แก้ไขสำเร็จแล้ว', 
         Reporters: {
           village: 'บ้านไผ่ล้อม' 
         }
       },
       _count: {
         sub_issue: true
       },
       orderBy: {
         _count: {
           sub_issue: 'desc' 
         }
       }
     });
 
     
     const result = issues.map(issue => {
       const count = issue._count.sub_issue;
 
       let B_value = 0;
       if (count >= 1 && count <= 20) {
         B_value = 1;
       } else if (count >= 21 && count <= 50) {
         B_value = 2;
       } else if (count >= 51 && count <= 100) {
         B_value = 3;
       } else if (count >= 101 && count <= 150) {
         B_value = 4;
       } else if (count >= 151) {
         B_value = 5;
       }
 
       const total_score = (B_value * 0.3) + (count * 0.4);
 
       return {
         sub_issue: issue.sub_issue,
         status: issue.status,
         count: count,
         total_score: total_score.toFixed(2)
       };
     });
 
     
     res.json(result);
 
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server Error' });
   }
};

exports.WSucceedAll = async (req, res) => {
  try {
    const issues = await prisma.water_issues.groupBy({
      by: ['sub_issue', 'status'],
      where: {
        status: 'แก้ไขสำเร็จแล้ว', 
      },
      _count: {
        sub_issue: true 
      },
      orderBy: {
        _count: {
          sub_issue: 'desc' 
        }
      }
    });

    
    const result = issues.map(issue => {
      const count = issue._count.sub_issue;

      let B_value = 0;
      if (count >= 1 && count <= 20) {
        B_value = 1;
      } else if (count >= 21 && count <= 50) {
        B_value = 2;
      } else if (count >= 51 && count <= 100) {
        B_value = 3;
      } else if (count >= 101 && count <= 150) {
        B_value = 4;
      } else if (count >= 151) {
        B_value = 5;
      }

      const total_score = (B_value * 0.3) + (count * 0.4);

      return {
        sub_issue: issue.sub_issue,
        status: issue.status,
        count: count,
        total_score: total_score.toFixed(2)
      };
    });

    
    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.WSucceedL2 = async (req, res) => {
  try {
    
    const issues = await prisma.water_issues.findMany({
      where: {
        status: 'แก้ไขสำเร็จแล้ว',
        Reporters: {
          village: 'บ้านไผ่ล้อม'
        }
      },
      select: {
        sub_issue: true,
        description: true,  
        resolution_detail: true,  
        status: true,  
        update_at: true,  
        Reporters: {
          select: {
            fullname: true 
          }
        }
      },
      orderBy: {
        update_at: 'desc',  
      }
    });

    
    const groupedResults = {};

    issues.forEach(issue => {
      const subIssue = issue.sub_issue;
      if (!groupedResults[subIssue]) {
        groupedResults[subIssue] = [];
      }
      
      groupedResults[subIssue].push({
        sub_issue: issue.sub_issue,
        description: issue.description,  
        resolution_detail: issue.resolution_detail,  
        status: issue.status,  
        updated_at: issue.update_at,  
        reporter_fullname: issue.Reporters.fullname  
      });
    });

    
    res.json(groupedResults);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
 
};

exports.WSucceedNG2 = async (req, res) => {
  try {
   
    const issues = await prisma.water_issues.findMany({
      where: {
        status: 'แก้ไขสำเร็จ',
        Reporters: {
          village: 'บ้านไผ่เงิน'
        }
      },
      select: {
        sub_issue: true,
        description: true,  
        resolution_detail: true,  
        status: true,  
        update_at: true,  
        Reporters: {
          select: {
            fullname: true  
          }
        }
      },
      orderBy: {
        update_at: 'desc',  
      }
    });

    
    const groupedResults = {};

    issues.forEach(issue => {
      const subIssue = issue.sub_issue;
      if (!groupedResults[subIssue]) {
        groupedResults[subIssue] = [];
      }
      
      groupedResults[subIssue].push({
        sub_issue: issue.sub_issue,
        description: issue.description,  
        resolution_detail: issue.resolution_detail,  
        status: issue.status,  
        updated_at: issue.update_at,  
        reporter_fullname: issue.Reporters.fullname  
      });
    });

   
    res.json(groupedResults);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.Wmovedata = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const waterIssue = await prisma.water_issues.findUnique({
      where: {
        id: parseInt(id) 
      }
    });

   
    if (!waterIssue) {
      return res.status(404).json({ message: "water issue not found." });
    }

    const reportId = waterIssue.report_id;

    
    await prisma.water_issues.delete({
      where: {
        id: parseInt(id) 
      }
    });

  
    await prisma.drainag_issues.deleteMany({
      where: {
        report_id: reportId
      }
    });

    await prisma.electricity_issues.deleteMany({
      where: {
        report_id: reportId
      }
    });

    await prisma.roade_issues.deleteMany({
      where: {
        report_id: reportId
      }
    });

    await prisma.health_issues.deleteMany({
      where: {
        report_id: reportId
      }
    });

  
    await prisma.reporters.delete({
      where: {
        id: reportId
      }
    });

   
    res.status(200).json({ message: "✅ All related data deleted successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.Wgetid = async (req, res) => {
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
        Water_issues: {
          select: {
            id: true,               
            sub_issue: true,          
            description: true,        
            image_url: true,          
            status: true,             
            resolution_detail: true,  
            update_at: true          
          }
        }
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

exports.WUpdate = async (req, res) => {
  try {
    const water_issue_id = parseInt(req.params.water_issue_id);  

    if (isNaN(water_issue_id)) {
      return res.status(400).json({ message: 'Invalid water_issue_id' });
    }

    
    const { water_issue_resolution_detail, water_issue_status } = req.body;  

  
    if (!water_issue_id) {
      return res.status(400).json({ message: 'Missing water_issue_id' });
    }

    console.log('water_issue_id to update:', water_issue_id);
    const existingIssue = await prisma.water_issues.findUnique({
      where: { id: water_issue_id }
    });

    if (!existingIssue) {
      return res.status(404).json({ message: `Water_issue with ID ${water_issue_id} not found.` });
    }

    
    const updatedWaterIssue = await prisma.water_issues.update({
      where: {
        id: water_issue_id,  
      },
      data: {
        description: water_issue_resolution_detail,  
        status: water_issue_status,
         
      },
      include: {
        Reporters: {  
          select: {
            id: true,  
            fullname: true,
            phone: true,
            province: true,
            district: true,
            subdistrict: true,
            village: true,
          },
        },
      },
    });

  
    res.json(updatedWaterIssue);

  } catch (err) {
    console.error('Error occurred:', err);  
    res.status(500).json({ message: 'Server Error', error: err.message });  
  }
};

exports.getAllWaterIssues  = async (req, res) => {
  try {
    
    const issuesWithReporters = await prisma.water_issues.findMany({
      select: {
        id: true,                
        sub_issue: true,          
        description: true,       
        status: true,             
        resolution_detail: true,  
        update_at: true,          
        Reporters: {                 
          select: {
            id: true,            
            fullname: true,      
            phone: true,         
            province: true,      
            district: true,      
            subdistrict: true,  
            village: true       
          }
        }
      }
    });

    
    if (!issuesWithReporters || issuesWithReporters.length === 0) {
      return res.status(404).json({ message: 'No drainage issues found' });
    }

    const formattedIssues = issuesWithReporters.map(issue => ({
      ...issue,
      reporter_address: `${issue.Reporters.province || ''} ${issue.Reporters.district || ''} ${issue.Reporters.subdistrict || ''} ${issue.Reporters.village || ''}`.trim(),
    }));

    res.json(formattedIssues);
  

  } catch (err) {
    console.error('Error occurred:', err);  
    res.status(500).json({ message: 'Server Error', error: err.message }); 
  }
};

exports.WAllPhailom = async (req, res) => {
  try {
    const issues = await prisma.water_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: 'บ้านไผ่ล้อม'
        }
      },
      select: {
        sub_issue: true,
        description: true, 
        resolution_detail: true,  
        status: true,  
        update_at: true, 
        image_url: true, 
        Reporters: {
          select: {
            fullname: true  
          }
        }
      },
      orderBy: {
        update_at: 'desc',  
      }
    });

    const groupedResults = {};

    issues.forEach(issue => {
      const subIssue = issue.sub_issue;
      if (!groupedResults[subIssue]) {
        groupedResults[subIssue] = [];
      }

      groupedResults[subIssue].push({
        sub_issue: issue.sub_issue,
        description: issue.description,  
        resolution_detail: issue.resolution_detail,  
        status: issue.status,  
        updated_at: issue.update_at, 
        reporter_fullname: issue.Reporters.fullname,
        image_url: issue.image_url
      });
    });

    res.json(groupedResults);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

 exports.WAllPhaingen = async (req, res) => {
  try {
   
    const issues = await prisma.water_issues.findMany({
      where: {
        status: 'ยังไม่ได้รับการแก้ไข',
        Reporters: {
          village: 'บ้านไผ่เงิน'
        }
      },
      select: {
        sub_issue: true,
        description: true,  
        resolution_detail: true, 
        status: true,  
        update_at: true,  
        image_url: true,
        Reporters: {
          select: {
            fullname: true  
          }
        }
      },
      orderBy: {
        update_at: 'desc',  
      }
    });

    const groupedResults = {};

    issues.forEach(issue => {
      const subIssue = issue.sub_issue;
      if (!groupedResults[subIssue]) {
        groupedResults[subIssue] = [];
      }
      groupedResults[subIssue].push({
        sub_issue: issue.sub_issue,
        description: issue.description,  
        resolution_detail: issue.resolution_detail, 
        status: issue.status,  
        updated_at: issue.update_at, 
        reporter_fullname: issue.Reporters.fullname,
        image_url: issue.image_url
      });
    });

    res.json(groupedResults);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
 
 
 