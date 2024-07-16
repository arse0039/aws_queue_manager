# Office Hours Queue Management Web Application

## Description
This web application is designed to help Teaching Assistants (TAs) manage office hour queues more efficiently. It allows instructors and TAs to oversee virtual office hour sessions, ensuring a streamlined and organized process.

## Features
- Instructors and TAs can log in and generate a session link to share with students.
- Students use the provided link to add themselves to the queue.
- TAs can view the number of students in the queue and how long each student has been waiting.
- TAs can see a brief description of the student's issue.
- A single click allows TAs to open a Microsoft Teams message to the student.
- Students can be removed from the queue by the TA once they've been helped.

## Technologies Used
- **Next.js**: React framework for building the application and state management.
- **TypeScript**: Programming language used for type safety.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Amazon Web Services (AWS)**:
  - **Cognito**: For authentication.
  - **Amplify**: For deployment and hosting.
  - **DynamoDB**: NoSQL database for storing data.
  - **API Gateway**: To create, publish, maintain, monitor, and secure REST and webSocket APIs.
  - **Lambda**: Serverless functions to handle backend operations.
  - **DynamoDB Streams** and **WebSocket API**: For near-real-time re-rendering of view components.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/aws_queue_manager.git
    cd aws_queue_manager
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables for AWS services (e.g., Cognito, Amplify, DynamoDB).

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
1. Log in as an instructor or TA.
2. Generate and share a session link with students.
3. Share link with students of the class. 
4. Use adjustable queue window to view the number of students and their wait times.
5. Click the 'Send Message' button to open a Teams message to the current student.
6. Remove student from the queue after assisting them to move on to the next student!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

