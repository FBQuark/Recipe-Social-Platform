import React from "react";
import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; //react-bootstrap

import { Navbar } from '../components/Navbar';
import { PostRecipe } from '../components/PostRecipe';

const CommunityGuidelines = () => {
    return(
        <div>
            <Navbar />
            <PostRecipe />
            <div className="jumbotron jumbotron-fluid" >
                <div className="container" style={{justifyContent: "center", display: "flex"}}>
                    <h1 className="display-3" ><b>Community Guidelines</b></h1>
                </div>
            </div>

            {/* Collapsable Box One */}
            <div style={{margin: '0px 10% 0px 10%'}}>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Posting Recipes</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                We welcome you to share your favorite recipes and culinary creations, fostering a space where food enthusiasts can connect and inspire one another. To maintain a respectful and enjoyable environment, all recipe posts must adhere to our community standards. Posts that contain inappropriate content, such as explicit sexual themes, violent imagery, or any other material deemed offensive or harmful, are strictly prohibited. This ensures our community remains inclusive and safe for everyone.
                            </p>
                            <br />
                            <p>
                            Our moderation team reserves the right to review and manage posts as necessary. If a post violates these guidelines or disrupts the community's spirit, administrators may remove it without prior notice. This helps maintain the integrity and positivity of our shared space.
                            By posting recipes, you agree to uphold these guidelines and contribute to a vibrant, welcoming community. Thank you for sharing your creativity and passion for cooking!
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Reporting Posts</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                We encourage all members to help maintain the quality and safety of our community by reporting posts that violate our guidelines. If you come across content that includes inappropriate themes, offensive material, or any other guideline breach, we humbly ask that you report it. Your cooperation ensures this space remains respectful and enjoyable for everyone.
                            </p>

                            <br />
                                
                            <p>
                                All reports are reviewed promptly by our moderation team. Posts that are found to violate our community standards will be addressed swiftly. However, we also value fairness—if you consistently report posts that comply with the guidelines, your account may be subject to deactivation. This measure helps prevent misuse of the reporting system and ensures it remains a tool for genuine concerns.
                            </p>

                            <br />

                            <p>
                                Thank you for your understanding and commitment to fostering a positive and supportive environment!
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Verification and Verification Requests</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                As a valued member of our community, you have the opportunity to earn a verification badge, recognizing your contributions and commitment to maintaining a positive space. Verified users will have a checkmark displayed on their posts, signaling to others that your content has earned our trust.
                            </p>

                            <br />

                            <p>
                                Verification is awarded based on several factors, including but not limited to:
                                <ul>
                                    <li>
                                        The average number of posts you share over a given timeframe.
                                    </li>
                                    <li>
                                        Your average rating scores.
                                    </li>
                                    <li>
                                        The average and total number of times other users save your posts.
                                    </li>
                                    <li>
                                        The number of reports filed against your posts.
                                    </li>
                                </ul>
                            </p>

                            <br />

                            <p>
                                Please note that while these criteria guide our decisions, the final determination rests with the discretion of our admin team. Submitting excessive verification requests may result in account deactivation, as we aim to ensure the process remains fair and manageable.
                            </p>

                            <br />

                            <p>
                                We appreciate your contributions and look forward to recognizing those who consistently enrich our community!
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Account Deactivation</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                To ensure our community remains a safe, respectful, and enjoyable space, adherence to the guidelines outlined above is essential. If any of these guidelines are violated, we reserve the right to deactivate your account. This policy allows us to uphold the standards that make our community a welcoming and positive environment for all members.
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Account Recovery</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                If you believe your account was deactivated in error, we encourage you to reach out to us for assistance. Please provide any relevant details when contacting us, and our team will review your case promptly.
                            </p>

                            <br />

                            <p>
                                Additionally, if you have forgotten your password or username, you can use the recovery options provided on the login page or contact us directly for support. Our goal is to help you regain access quickly and seamlessly.
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>Contact Us</Accordion.Header>
                        <Accordion.Body>
                            <p>Having technical issues? Please contact our tech team!</p>
                            <p><b>Email:</b> rr.techsupport@gmail.com</p>

                            <br/>

                            <p>Want to reach out to share new ideas or collaborate?</p>
                            <p><b>Email:</b> rr.community@gmail.com</p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            

        </div>
    );
};

export default CommunityGuidelines;