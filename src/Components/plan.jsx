import React, { useEffect } from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";

const steps = [
  {
    month: "Month 1",
    title: "MVP Launch",
    description:
      "Launch essential functionalities like contract creation, payment facilitation and contract management. Ensure mobile-first design.",
  },
  {
    month: "Month 2",
    title: "Optimization and Outreach",
    description:
      "Refine usability, simplify navigation, and add local language support if possible. Partner with community leaders, unions, and worker associations.",
  },
  {
    month: "Month 3",
    title: "Strategic Partnerships",
    description:
      "Engage with production houses, hotel managers, hostel owners and staffing agencies in Hyderabad. Recruit local influencers and vocational training centers.",
  },
  {
    month: "Month 4",
    title: "Awareness Campaign",
    description:
      "Launch localized campaigns, deploy field teams for live demonstrations, and share success stories from early adopters.",
  },
  {
    month: "Month 5",
    title: "Pilot Expansion",
    description:
      "Focus on sector-specific pilots for film, hospitality, and hotel industries. Provide dedicated customer support helplines.",
  },
  {
    month: "Month 6",
    title: "Scaling User Base",
    description:
      "Offer onboarding incentives if possible, referral rewards, and skill showcase tools. Set up customer support in local languages.",
  },
  {
    month: "Month 7",
    title: "Retention and Engagement",
    description:
      "Add worker-requested features, organize meet-ups and forums with local unorganized workers, and implement loyalty programs.",
  },
  {
    month: "Month 8",
    title: "Hyderabad-Wide Rollout",
    description:
      "Ensure robust infrastructure for high traffic. Partner with local businesses and launch citywide advertising campaigns.",
  },
];

const styles = {
  container: {
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  stepCircle: {
    fontWeight: "bold",
    color: "white",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
  },
  card: {
    border: "none",
    borderRadius: "8px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: "1.1rem",
    color: "#333",
  },
  cardText: {
    color: "#555",
  },
};

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container style={styles.container}>
      <h1 style={styles.header}>8-Month Plan for Onboarding the Unorganized Workforce</h1>
      <h5 style={styles.header}>
        A Comprehensive Roadmap for Digital Workforce Transformation
      </h5>
      <Row>
        {steps.map((step, index) => (
          <Col key={index} md={6} className="mb-4">
            <Card style={styles.card}>
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      ...styles.stepCircle,
                      backgroundColor: getColor(index),
                    }}
                    className="me-3"
                  >
                    {index + 1}
                  </div>
                  <Card.Title style={styles.cardTitle}>
                    {step.month}: {step.title}
                  </Card.Title>
                </div>
                <Card.Text style={styles.cardText}>{step.description}</Card.Text>
                <ProgressBar now={(index + 1) * 12.5} label={`${(index + 1) * 12.5}%`} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

function getColor(index) {
  const colors = ["#6c757d", "#6f42c1", "#0dcaf0", "#20c997", "#198754", "#ffc107", "#dc3545", "#0d6efd"];
  return colors[index % colors.length];
}

export default App;
