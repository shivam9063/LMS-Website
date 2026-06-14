import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCertificate, FaStar, FaMedal, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

const Certificate = ({ isVisible, onClose, userData, course }) => {
  const certificateRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Backup data from Redux if props are not working
  const reduxUserData = useSelector((state) => state.user.userData);
  const reduxCourseData = useSelector((state) => state.course.courseData);
  
  // Use backup data if props are undefined/null
  const finalUserData = userData || reduxUserData;
  const finalCourseData = course || reduxCourseData?.[0]; // using first course as fallback
  
  // Certificate is working properly now!
  
  // Generate unique certificate ID
  const certificateId = `LMS-${finalCourseData?._id?.slice(-6)?.toUpperCase()}-${finalUserData?._id?.slice(-4)?.toUpperCase()}-${new Date().getFullYear()}`;

  const generatePDF = async () => {
    if (!certificateRef.current) return;
    
    try {
      setIsGenerating(true);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${finalUserData?.name || 'Student'}_${finalCourseData?.title || finalCourseData?.name || 'Course'}_Certificate_${certificateId}.pdf`);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error generating certificate: ${error.message}`);
      setIsGenerating(false);
    }
  };

  const generateJPG = async () => {
    if (!certificateRef.current) return;
    
    try {
      setIsGenerating(true);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${finalUserData?.name || 'Student'}_${finalCourseData?.title || finalCourseData?.name || 'Course'}_Certificate_${certificateId}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } else {
          throw new Error('Failed to create image blob');
        }
        setIsGenerating(false);
      }, 'image/jpeg', 0.95);
    } catch (error) {
      console.error('Error generating JPG:', error);
      alert(`Error generating certificate: ${error.message}`);
      setIsGenerating(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <FaCertificate className="text-3xl text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-800">Course Completion Certificate</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 p-6 border-b bg-gray-50">
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FaDownload />
            {isGenerating ? 'Generating PDF...' : 'Download PDF'}
          </button>
          <button
            onClick={generateJPG}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FaDownload />
            {isGenerating ? 'Generating JPG...' : 'Download JPG'}
          </button>
        </div>

        {/* Certificate Preview */}
        <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
            <div
            ref={certificateRef}
            style={{
              width: '800px',
              height: '700px',
              margin: '0 auto',
              background: '#ffffff',
              border: '12px solid',
              borderImage: 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899) 1',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            
            {/* Blue Curved Decorative Elements */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              pointerEvents: 'none'
            }}>
              
              {/* Top Left Blue Curve */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '350px',
                height: '180px',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                borderRadius: '0 0 180px 0',
                opacity: '0.9'
              }}></div>
              
              {/* Bottom Right Blue Curve */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '350px',
                height: '180px',
                background: 'linear-gradient(315deg, #1e40af 0%, #3b82f6 100%)',
                borderRadius: '180px 0 0 0',
                opacity: '0.9'
              }}></div>
              
              {/* Decorative Lines in Curves */}
              <div style={{
                position: 'absolute',
                top: '30px',
                left: '30px',
                width: '150px',
                height: '2px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '1px'
              }}></div>
              
              <div style={{
                position: 'absolute',
                top: '50px',
                left: '50px',
                width: '120px',
                height: '2px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '1px'
              }}></div>
              
              <div style={{
                position: 'absolute',
                bottom: '30px',
                right: '30px',
                width: '150px',
                height: '2px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '1px'
              }}></div>
              
              <div style={{
                position: 'absolute',
                bottom: '50px',
                right: '50px',
                width: '120px',
                height: '2px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '1px'
              }}></div>
              
            </div>

            {/* Main Content */}
            <div style={{
              padding: '40px 40px 30px 40px',
              textAlign: 'center',
              position: 'relative',
              zIndex: '10',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
            }}>
              
              {/* Header */}
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#1e40af',
                  marginBottom: '10px',
                  letterSpacing: '8px',
                  fontFamily: '"Times New Roman", serif',
                  textShadow: '1px 1px 2px rgba(30, 64, 175, 0.3)'
                }}>
                  CERTIFICATE
                </h1>
                
                <div style={{
                  width: '120px',
                  height: '3px',
                  background: '#1e40af',
                  margin: '0 auto 10px auto',
                  borderRadius: '1px'
                }}></div>
                
                <h2 style={{
                  fontSize: '16px',
                  fontWeight: '300',
                  color: '#9ca3af',
                  marginBottom: '0',
                  letterSpacing: '6px',
                  textTransform: 'uppercase',
                  fontFamily: '"Arial", sans-serif'
                }}>
                  OF COMPLETION
                </h2>
              </div>

              {/* Main Content */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                
                {/* Intro Text */}
                <p style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  marginBottom: '15px',
                  fontFamily: '"Times New Roman", serif',
                  fontStyle: 'italic',
                  letterSpacing: '1px'
                }}>This is to certify that</p>
                
                {/* Student Name */}
                <div style={{
                  marginBottom: '15px',
                  padding: '15px 0',
                  borderBottom: '3px solid #1e40af',
                  background: 'transparent',
                  position: 'relative'
                }}>
                  <h2 style={{
                    fontSize: '38px',
                    fontWeight: 'bold',
                    color: '#1e40af',
                    margin: '0',
                    fontFamily: '"Times New Roman", serif',
                    letterSpacing: '3px',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(30, 64, 175, 0.2)',
                    textTransform: 'uppercase'
                  }}>
                    {finalUserData?.name || finalUserData?.firstName || 'TEST STUDENT NAME'}
                  </h2>
                </div>
                
                <p style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  marginBottom: '15px',
                  fontFamily: '"Times New Roman", serif',
                  fontStyle: 'italic',
                  letterSpacing: '0.5px'
                }}>has successfully completed the course</p>
                
                {/* Course Title */}
                <div style={{
                  background: '#ffffff',
                  padding: '15px 20px',
                  borderRadius: '15px',
                  marginBottom: '20px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  position: 'relative'
                }}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: '#1e40af',
                    margin: '0',
                    fontFamily: '"Times New Roman", serif',
                    letterSpacing: '1px',
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}>
                    {finalCourseData?.title || finalCourseData?.name || 'TEST COURSE NAME'}
                  </h3>
                </div>
                
                {/* Certificate Details */}
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                  <p style={{
                    fontSize: '13px',
                    color: '#1e40af',
                    marginBottom: '5px',
                    fontFamily: '"Times New Roman", serif',
                    fontWeight: 'bold',
                    letterSpacing: '1px'
                  }}>
                    Certificate ID: {certificateId}
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginBottom: '0',
                    fontFamily: '"Arial", sans-serif',
                    letterSpacing: '0.5px'
                  }}>
                    Completed on {format(new Date(), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>
                
              {/* Professional Footer with Company Info */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 30px',
                borderTop: '3px solid #1e40af',
                marginTop: '20px',
                background: 'linear-gradient(45deg, #f8fafc 0%, #ffffff 100%)',
                borderRadius: '0 0 10px 10px',
                position: 'relative'
              }}>
                
                {/* Decorative Stars */}
                <div style={{
                  position: 'absolute',
                  left: '10px',
                  top: '10px',
                  width: '30px',
                  height: '30px',
                  background: '#ec4899',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FaStar style={{ fontSize: '14px', color: '#ffffff' }} />
                </div>
                
                <div style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  width: '30px',
                  height: '30px',
                  background: '#06b6d4',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FaStar style={{ fontSize: '14px', color: '#ffffff' }} />
                </div>
                
                {/* Left - Company Platform */}
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <p style={{
                    fontSize: '16px',
                    color: '#1e40af',
                    marginBottom: '2px',
                    fontFamily: '"Times New Roman", serif',
                    fontWeight: 'bold',
                    letterSpacing: '1px'
                  }}>
                    EduLearn
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#1e40af',
                    marginBottom: '0',
                    fontFamily: '"Times New Roman", serif',
                    textDecoration: 'underline'
                  }}>
                    Platform
                  </p>
                  <p style={{
                    fontSize: '10px',
                    color: '#6b7280',
                    marginBottom: '0',
                    fontFamily: '"Arial", sans-serif',
                    marginTop: '3px'
                  }}>
                    Platform Authority
                  </p>
                  <p style={{
                    fontSize: '9px',
                    color: '#9ca3af',
                    marginBottom: '0',
                    fontFamily: '"Arial", sans-serif'
                  }}>
                    Learning Management System
                  </p>
                </div>

                {/* Center - Official Seal */}
                <div style={{ textAlign: 'center', flex: '0 0 120px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    border: '4px solid #f59e0b',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    background: '#ffffff',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                    margin: '0 auto'
                  }}>
                    <FaCertificate style={{ fontSize: '24px', color: '#f59e0b', marginBottom: '2px' }} />
                  </div>
                  <p style={{
                    fontSize: '9px',
                    color: '#f59e0b',
                    marginTop: '5px',
                    fontFamily: '"Arial", sans-serif',
                    fontWeight: 'bold',
                    letterSpacing: '1px'
                  }}>
                    OFFICIAL SEAL
                  </p>
                </div>

                {/* Right - Founder Signature */}
                <div style={{ textAlign: 'right', flex: 1 }}>
                  <p style={{
                    fontSize: '16px',
                    color: '#1e40af',
                    marginBottom: '2px',
                    fontFamily: '"Brush Script MT", cursive',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    fontStyle: 'italic'
                  }}>
                    Shivam Pathak
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '0',
                    fontFamily: '"Arial", sans-serif',
                    fontWeight: 'bold'
                  }}>
                    Shivam Pathak
                  </p>
                  <p style={{
                    fontSize: '10px',
                    color: '#6b7280',
                    marginBottom: '0',
                    fontFamily: '"Arial", sans-serif',
                    marginTop: '2px'
                  }}>
                    Founder & CEO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;