import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const FaqPage = () => {
 const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
   border: `1px solid #b5b5b5`,
   boxShadow: `0.1rem 0.1rem 0.3rem rgb(255, 153, 51)`,
   backgroundColor: `rgb(141, 140, 140,0.05)`,
   '&:before': {
     display: 'none'
   }
 }));
 const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
   padding: theme.spacing(2),
   borderTop: '1px solid rgba(0, 0, 0, .125)',
   backgroundColor:''
 }));
  return (
    <div className="container d-flex flex-column justify-content-center mt-3">
      <h2 className="d-flex justify-content-center  text-decoration-underline mb-5 ">Frequently Asked Questions</h2>
      <div className="mb-5 col-lg-9 col-md-10 col-sm-11 mx-auto" >
        <Accordion className='my-4'>
          <AccordionSummary className='heading-text fw-semibold' expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            Why should I book a car from Infila?
          </AccordionSummary>
          <AccordionDetails className='normal-text'>
              We are giving a car to self-driving, the cheapest rental service, unlimited KMS, and NO security deposit.  
          </AccordionDetails>
        </Accordion>
        <Accordion className='my-4'>
          <AccordionSummary className='heading-text fw-semibold' expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              Booking criteria and required documents?  
          </AccordionSummary>
          <AccordionDetails className='normal-text'>
              Min age 20 years old & valid original government ID (Aadhar&PAN Card) and a valid driving license.  
          </AccordionDetails>
        </Accordion>
        <Accordion className='my-4'>
          <AccordionSummary className='heading-text fw-semibold' expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              What is the speed limit of the car?  
          </AccordionSummary>
          <AccordionDetails className='normal-text'>
              Infila allows up to 120Km/hr.  
          </AccordionDetails>
        </Accordion>
        <Accordion className='my-4'>
          <AccordionSummary className='heading-text fw-semibold' expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              Can I Extend/Cancel/ Modify the trip?  
          </AccordionSummary>
          <AccordionDetails className='normal-text'>
              Yes, extending the trip due to availability & charges. Cancellations & modifications will charge as per our policy.  
          </AccordionDetails>
        </Accordion>
        <Accordion className='my-4'>
          <AccordionSummary className='heading-text fw-semibold' expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              What if I cancel my trip?  
          </AccordionSummary>
          <AccordionDetails className='normal-text'>
              
              <ul>
                <li>100% refund if canceled before 24 hours of the trip start time.</li>
                <li>Flat 500/- will be deducted if canceled between 24 - 8 hours of the trip start time.</li>
                <li>50% of the booking amount will be deducted if canceled between 8 - 3 hours of the trip start time.</li>
                <li>No refund if canceled within 3 hours of the trip start time.</li>
              </ul>
              
          </AccordionDetails>
        </Accordion>
        <Accordion className='my-4'>
          <AccordionSummary className='heading-text fw-semibold' expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              What if I want to reschedule my trip before starting?  
          </AccordionSummary>
          <AccordionDetails className='normal-text'>
              
              <ul>
                <li>You can modify your trip before 8hrs it will be charge free.</li>
                <li>If you modify your trip after 8hrs it will be charged 250/-.</li>
              </ul>
              
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default FaqPage;
