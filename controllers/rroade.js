const prisma = require('../prismaClient'); 

 exports.RListlf = async (req, res) => {
   try {
     const issues = await prisma.roade_issues.groupBy({
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

 exports.RListNG = async (req, res) => {
   try {
     const issues = await prisma.roade_issues.groupBy({
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

 exports.RListlsuesf = async (req, res) => {
   try {
     const issues = await prisma.roade_issues.findMany({
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

 exports.RListlsuesfNG = async (req, res) => {
   try {
     const issues = await prisma.roade_issues.findMany({
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

 exports.RProgressL = async (req, res) => {
   try {
     const issues = await prisma.roade_issues.groupBy({
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

 exports.RProgressAll = async (req, res) => {
   try {
     const issues = await prisma.roade_issues.groupBy({
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
 
 exports.RProgressL2 = async (req, res) => {
   try {
     
     const issues = await prisma.Roade_issues.findMany({
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

 exports.RProgressNG2 = async (req, res) => {
   try {
     const issues = await prisma.Roade_issues.findMany({
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
         reporter_fullname:issue.Reporters.fullname 
       });
     });
 
     
     res.json(groupedResults);
 
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server Error' });
   }
 };

 exports.RSucceedL = async (req, res) => {
   try {
     const issues = await prisma.roade_issues.groupBy({
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

 exports.RSucceedAll = async (req, res) => {
   try {
     const issues = await prisma.roade_issues.groupBy({
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

 exports.RSucceedL2 = async (req, res) => {
   try {
     const issues = await prisma.Roade_issues.findMany({
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

 exports.RSucceedNG2 = async (req, res) => {
   try {
     const issues = await prisma.Roade_issues.findMany({
       where: {
         status: 'แก้ไขสำเร็จแล้ว',
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

 exports.Rmovedata = async (req, res) => {
   try {
     const { id } = req.params; 
 
     
     const roadeIssue = await prisma.roade_issues.findUnique({
       where: {
         id: parseInt(id) 
       }
     });
 
     
     if (!roadeIssue) {
       return res.status(404).json({ message: "Roade issue not found." });
     }
 
     const reportId = roadeIssue.report_id;
 
     await prisma.roade_issues.delete({
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
 
     await prisma.water_issues.deleteMany({
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

 exports.Rgetid = async (req, res) => {
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
         Roade_issues: {
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

 exports.RUpdate = async (req, res) => {
   try {
     const roade_issue_id = parseInt(req.params.roade_issue_id);  
 
     if (isNaN(roade_issue_id)) {
       return res.status(400).json({ message: 'Invalid roade_issue_id' });
     }
 
     const { roade_issue_resolution_detail, roade_issue_status } = req.body;  
 
     if (!roade_issue_id) {
       return res.status(400).json({ message: 'Missing roade_issues_id' });
     }

     console.log('roade_issue_id to update:', roade_issue_id);

    const existingIssue = await prisma.roade_issues.findUnique({
      where: { id: roade_issue_id }
    });

    if (!existingIssue) {
      return res.status(404).json({ message: `Roade issue with ID ${roade_issue_id} not found.` });
    }

     const updatedRoadeIssue = await prisma.roade_issues.update({
       where: {
         id: roade_issue_id, 
       },
       data: {
         resolution_detail: roade_issue_resolution_detail,  
         status: roade_issue_status,
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
 
     res.json(updatedRoadeIssue);
 
   } catch (err) {
     console.error('Error occurred:', err); 
     res.status(500).json({ message: 'Server Error', error: err.message });  
   }
 };

 exports.getAllRaodeIssues  = async (req, res) => {
   try {
     
     const issuesWithReporters = await prisma.roade_issues.findMany({
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
 
     res.json(issuesWithReporters);
     console.log("555555",issuesWithReporters);
 
   } catch (err) {
     console.error('Error occurred:', err);  
     res.status(500).json({ message: 'Server Error', error: err.message });  
   }
 };

 exports.RAllPailom = async (req, res) => {
   try {
     const issues = await prisma.roade_issues.findMany({
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
 
 exports.RAllPaingen = async (req, res) => {
   try {

     const issues = await prisma.roade_issues.findMany({
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