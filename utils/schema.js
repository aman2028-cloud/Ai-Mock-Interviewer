import { pgTable, varchar, text ,serial} from "drizzle-orm/pg-core";


export const MockInterview=pgTable("mock_interviews",{
  id:serial("id").primaryKey(),
  jsonMockInterviewData:text("json_mock_interview_data").notNull(),
  jobPos:varchar("job_pos").notNull(),
  jobDesc:varchar("job_desc").notNull(),
  jobExperience:varchar("job_experience").notNull(),
  createdBy:varchar("created_by").notNull(),
  createdAt:varchar("created_at").notNull(),
  mockId:varchar("mock_id").notNull(),
})


export const UserAnswers=pgTable("user_answers",{
  id:serial("id").primaryKey(),
  mockIdRef:varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns:text("correctAns"),
  userAns:text("userAns"),
  feedback:text("feedback"),
  rating:varchar("rating"),
  userEmail:varchar("user_email"),
  createdAt:varchar("created_at")
})