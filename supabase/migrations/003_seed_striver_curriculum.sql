-- Idempotent Seed for Striver A2Z DSA Sheet
INSERT INTO public.curriculum_sheets (id, slug, title, description, total_topics, total_sections, total_problems, is_published)
VALUES ('ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'striver-a2z', 'Striver A2Z DSA Sheet', 'Comprehensive step-by-step Data Structures & Algorithms learning path from basics to advanced topics.', 18, 61, 463, true)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('9fde9eed-11ea-5f47-9ef3-bbe24b12858c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 1, 'Step 1: Learn the Basics', 'step-1-learn-the-basics', 1, 42)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('145a38cd-4a49-5bfa-8e86-9a344641ec72', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 2, 'Step 2: Learn Important Sorting Techniques', 'step-2-learn-important-sorting-techniques', 2, 7)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 3, 'Step 3: Solve Problems on Arrays', 'step-3-solve-problems-on-arrays', 3, 40)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 4, 'Step 4: Binary Search', 'step-4-binary-search', 4, 32)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('51584254-3699-5643-987f-284f4ab13aee', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 5, 'Step 5: Strings', 'step-5-strings', 5, 16)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 6, 'Step 6: Linked List', 'step-6-linked-list', 6, 31)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('3f8b494d-fc79-5177-962f-0acdfba27b55', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 7, 'Step 7: Recursion', 'step-7-recursion', 7, 23)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('3f6be3d6-f16e-552e-8c80-6680d08c97d6', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 8, 'Step 8: Bit Manipulation', 'step-8-bit-manipulation', 8, 18)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('c47fad05-ab4d-51ed-8889-3eac720660b5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 9, 'Step 9: Stack and Queues', 'step-9-stack-and-queues', 9, 30)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('07c97af5-e42d-5f5f-840c-c3b210d57f1e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 10, 'Step 10: Sliding Window and Two Pointer Combined Problems', 'step-10-sliding-window-and-two-pointer-combined-problems', 10, 12)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 11, 'Step 11: Heaps', 'step-11-heaps', 11, 19)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('9f892f92-7b77-5a63-b5ff-7a4263ba54ca', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 12, 'Step 12: Greedy Algorithms', 'step-12-greedy-algorithms', 12, 16)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 13, 'Step 13: Binary Trees', 'step-13-binary-trees', 13, 36)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('3ad19d2a-8709-58fc-9a03-fb8f6f83238d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 14, 'Step 14: Binary Search Trees', 'step-14-binary-search-trees', 14, 16)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('91bac199-9026-5454-aa1a-772f8496db08', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 15, 'Step 15: Graphs', 'step-15-graphs', 15, 52)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('29314c4f-35a8-5895-9381-f342b6fa0ec1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 16, 'Step 16: Dynamic Programming', 'step-16-dynamic-programming', 16, 59)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('87fda366-9511-59cd-a1f0-a1de02d7cfe6', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 17, 'Step 17: Tries', 'step-17-tries', 17, 7)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;
INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)
VALUES ('3a04d9ed-206a-584f-b489-7bea493146d1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 18, 'Step 18: Strings (Advanced)', 'step-18-strings-advanced', 18, 7)
ON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;

INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('749c3f3b-825c-5ec0-9df1-4f14516f905f', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '1.1 Things to Know in a Language (C++/Java/Python)', '1-1-things-to-know-in-a-language-c-java-python', 1, 9)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('c596f8f7-24c2-5970-ab5e-f1c31982a449', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '1.2 Build-up Logical Thinking (Patterns)', '1-2-build-up-logical-thinking-patterns', 2, 1)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('2198b950-fd74-5d78-be19-cdb50d5dfe44', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '1.3 Learn STL / Java Collections / Python Collections', '1-3-learn-stl-java-collections-python-collections', 3, 10)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('314668c3-58e1-5cc2-83fd-dea6a0b295e5', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '1.4 Know Basic Maths', '1-4-know-basic-maths', 4, 7)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('201ae15e-072b-573f-bd31-726f42a49830', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '1.5 Learn Basic Recursion', '1-5-learn-basic-recursion', 5, 8)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('49b7fc87-2900-548c-9f63-464b928ee617', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '1.6 Learn Basic Hashing', '1-6-learn-basic-hashing', 6, 7)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('8c02ad16-30f8-57ad-9f51-08fc35740b40', '145a38cd-4a49-5bfa-8e86-9a344641ec72', '2.1 Sorting-I', '2-1-sorting-i', 7, 3)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('370212d5-23b7-5726-b854-594cbb2a49a0', '145a38cd-4a49-5bfa-8e86-9a344641ec72', '2.2 Sorting-II', '2-2-sorting-ii', 8, 4)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('e96c480a-57ad-5a5a-823a-daf1671a8925', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '3.1 Easy', '3-1-easy', 9, 14)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '3.2 Medium', '3-2-medium', 10, 14)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '3.3 Hard', '3-3-hard', 11, 12)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('406bb1c3-e915-52f0-870b-ae4fa4abe1a6', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '4.1 BS on 1D Arrays', '4-1-bs-on-1d-arrays', 12, 13)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('19e429b8-0232-53df-8a94-5e41ea25f4d7', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '4.2 BS on Answers', '4-2-bs-on-answers', 13, 14)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('fb072acf-95fe-51a4-ad37-392493010192', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '4.3 BS on 2D Arrays', '4-3-bs-on-2d-arrays', 14, 5)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('ff865e3f-2f01-5fa8-a8f9-ec685dc733f5', '51584254-3699-5643-987f-284f4ab13aee', '5.1 Basic and Easy', '5-1-basic-and-easy', 15, 8)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('7fb72de0-b280-5b23-85ea-65dd3541f0da', '51584254-3699-5643-987f-284f4ab13aee', '5.2 Medium', '5-2-medium', 16, 8)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('090735b3-1301-5f45-b97c-26e2dd5c60c4', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '6.1 Learn 1D Linked List', '6-1-learn-1d-linked-list', 17, 5)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('30bff249-bd9d-536e-89a2-e1abd2d96b7e', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '6.2 Learn Doubly Linked List', '6-2-learn-doubly-linked-list', 18, 4)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('c3647b9f-2bd9-5e30-89b0-67085f147ddb', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '6.3 Medium Problems of LL', '6-3-medium-problems-of-ll', 19, 15)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('eaa8309b-b1d6-5d1c-893b-c03bdbad546e', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '6.4 Medium Problems of DLL', '6-4-medium-problems-of-dll', 20, 3)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('ef42b94c-000e-541c-800a-94507e19b656', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '6.5 Hard Problems of LL', '6-5-hard-problems-of-ll', 21, 4)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('b2a16a7e-378d-51e6-bab3-d14b720deffb', '3f8b494d-fc79-5177-962f-0acdfba27b55', '7.1 Get a Strong Hold of Recursion', '7-1-get-a-strong-hold-of-recursion', 22, 6)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('bc428a08-6f18-55ae-aa49-5149f2554427', '3f8b494d-fc79-5177-962f-0acdfba27b55', '7.2 Subsequences Pattern', '7-2-subsequences-pattern', 23, 9)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('b63a9b3d-2bdb-53d0-96a8-f8f9cf81b1b8', '3f8b494d-fc79-5177-962f-0acdfba27b55', '7.3 Trying Out All Combos / Hard', '7-3-trying-out-all-combos-hard', 24, 8)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('1c71f4ab-7d8c-5503-a22b-aa87a7a58c86', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '8.1 Learn Bit Manipulation', '8-1-learn-bit-manipulation', 25, 8)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('4921a4b0-0a0e-5709-a687-8f2c61ea29c0', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '8.2 Interview Problems', '8-2-interview-problems', 26, 5)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('46b741df-3b19-5e5f-a7d6-8e0aafdae5cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '8.3 Advanced Maths', '8-3-advanced-maths', 27, 5)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('e5d4d43c-bd72-566b-8b8d-c42223fd8751', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '9.1 Learning', '9-1-learning', 28, 8)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('2fa8ff44-4e32-5e45-9f2c-8cadcb33f061', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '9.2 Prefix, Infix, Postfix Conversion Problems', '9-2-prefix-infix-postfix-conversion-problems', 29, 6)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('f354bae1-a0dd-5053-8bcf-7ddc174262fe', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '9.3 Monotonic Stack / Queue Problems', '9-3-monotonic-stack-queue-problems', 30, 11)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('1ef1dfce-5ba7-5f0f-bea3-44e82e76e0bb', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '9.4 Implementation Problems', '9-4-implementation-problems', 31, 5)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('2d9ea744-14e2-5504-8d5d-e1c145408acc', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '10.1 Medium Problems', '10-1-medium-problems', 32, 8)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('8e03bf70-82ab-57e9-a7c0-c85f633ce462', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '10.2 Hard Problems', '10-2-hard-problems', 33, 4)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('2697bfcd-f7f9-5cf7-926b-b215f2b8eb51', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', '11.1 Learning', '11-1-learning', 34, 7)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('c6f3800e-3b34-5342-b86a-0ab7d63735c2', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', '11.2 Medium Problems', '11-2-medium-problems', 35, 6)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('b1a7b19d-8a8b-5fab-a9d5-7bc564760e68', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', '11.3 Hard Problems', '11-3-hard-problems', 36, 6)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('ea3068dd-f490-50dc-be11-275f42dd5eef', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '12.1 Easy', '12-1-easy', 37, 5)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('3ac3d8a6-4001-5b89-a48f-180906343b93', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '12.2 Medium / Hard', '12-2-medium-hard', 38, 11)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '13.1 Traversal Techniques', '13-1-traversal-techniques', 39, 11)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('45930f37-11d3-5ed2-8278-4a4d926f36a9', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '13.2 Medium Problems', '13-2-medium-problems', 40, 12)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('d8aba576-cb2e-5dfc-beed-f4f7b26a26a3', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '13.3 Hard Problems', '13-3-hard-problems', 41, 13)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('1d7a03d5-8a36-5c0a-bb23-b342af388e69', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '14.1 Concepts', '14-1-concepts', 42, 11)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('de8fe898-2f71-534f-b640-56815730da00', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '14.2 Practice Problems', '14-2-practice-problems', 43, 5)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('d1e8dc6f-ad9a-5466-a1e4-a953a698868a', '91bac199-9026-5454-aa1a-772f8496db08', '15.1 Learning', '15-1-learning', 44, 5)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('16cb10fd-40f5-5288-9c04-3b93c6f53dc7', '91bac199-9026-5454-aa1a-772f8496db08', '15.2 Problems on BFS / DFS', '15-2-problems-on-bfs-dfs', 45, 15)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('cc30771a-3dea-52e0-9d48-b6b774f69183', '91bac199-9026-5454-aa1a-772f8496db08', '15.3 Topological Sort and Problems', '15-3-topological-sort-and-problems', 46, 7)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('265b5adc-4274-59d8-86cc-880eeacb1691', '91bac199-9026-5454-aa1a-772f8496db08', '15.4 Shortest Path Algorithms and Problems', '15-4-shortest-path-algorithms-and-problems', 47, 12)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('fa2943b5-b31d-5c19-8ec1-59505737a539', '91bac199-9026-5454-aa1a-772f8496db08', '15.5 Minimum Spanning Tree / Disjoint Set and Problems', '15-5-minimum-spanning-tree-disjoint-set-and-problems', 48, 10)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('21e2c514-d3dc-5de4-ac64-03fc5f013858', '91bac199-9026-5454-aa1a-772f8496db08', '15.6 Other Algorithms', '15-6-other-algorithms', 49, 3)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('71015143-0d8b-595e-a4df-c83e2c80d6f3', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '16.1 Introduction to DP', '16-1-introduction-to-dp', 50, 3)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('396cb164-d1b9-595c-96cf-c92858181fab', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '16.2 1D DP', '16-2-1d-dp', 51, 6)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('f781cb8e-e54a-5ec7-a506-f8b90b7d8f61', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '16.3 2D / 3D DP and DP on Grids', '16-3-2d-3d-dp-and-dp-on-grids', 52, 7)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('23599c08-d75d-5da3-954e-73739d53d8d8', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '16.4 DP on Subsequences', '16-4-dp-on-subsequences', 53, 11)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('f25a32f6-54d4-5a19-b6a3-2a903a8c535d', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '16.5 DP on Strings', '16-5-dp-on-strings', 54, 10)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('4db5ea2e-dbec-53f8-99a1-3b4115f3b417', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '16.6 DP on Stocks', '16-6-dp-on-stocks', 55, 6)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('856797d1-e9bb-51df-b285-4dac7549a76e', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '16.7 DP on LIS', '16-7-dp-on-lis', 56, 7)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('519c28dd-4588-5f07-bbf9-de4fbc3984b1', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '16.8 MCM DP / Partition DP', '16-8-mcm-dp-partition-dp', 57, 7)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('f81615b9-868b-541d-8554-d194cf386579', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '16.9 DP on Squares', '16-9-dp-on-squares', 58, 2)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('3be2687c-c34c-580b-89b2-1d2566c54434', '87fda366-9511-59cd-a1f0-a1de02d7cfe6', '17.1 Theory', '17-1-theory', 59, 2)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('1e7892b6-4a82-5a97-8994-0f06683da3ba', '87fda366-9511-59cd-a1f0-a1de02d7cfe6', '17.2 Problems', '17-2-problems', 60, 5)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;
INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)
VALUES ('fc7619f4-4d95-5eaf-baa0-83fd6c4f70df', '3a04d9ed-206a-584f-b489-7bea493146d1', '18.1 Hard Problems', '18-1-hard-problems', 61, 7)
ON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;

INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('631bea2c-d43b-5328-80f4-e38b038470a3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '749c3f3b-825c-5ec0-9df1-4f14516f905f', 1, 'User Input / Output', 'Easy', '', 1)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c32df766-8ce4-5ba5-89c4-05d892e82842', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '749c3f3b-825c-5ec0-9df1-4f14516f905f', 2, 'Data Types', 'Easy', '', 2)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2bc0b618-760c-5c50-b3f7-8fec80147722', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '749c3f3b-825c-5ec0-9df1-4f14516f905f', 3, 'If Else Statements', 'Easy', '', 3)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('15fa51b0-b3f7-537b-a380-f8df4bba8c23', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '749c3f3b-825c-5ec0-9df1-4f14516f905f', 4, 'Switch Statement', 'Easy', '', 4)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ddd9e52a-e93e-5b50-ba93-9cf3643504fc', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '749c3f3b-825c-5ec0-9df1-4f14516f905f', 5, 'Arrays and Strings', 'Easy', '', 5)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('fa663af6-9c12-5975-9f63-3699e99fbd7a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '749c3f3b-825c-5ec0-9df1-4f14516f905f', 6, 'For / While / Do-While Loops', 'Easy', '', 6)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('4de1fe45-d66d-53a9-9e31-b78281f10bac', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '749c3f3b-825c-5ec0-9df1-4f14516f905f', 7, 'Functions (Pass by Value and Reference)', 'Easy', '', 7)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('55daa57a-7b91-53ce-992e-4d8ef83bf1eb', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '749c3f3b-825c-5ec0-9df1-4f14516f905f', 8, 'Time Complexity', 'Easy', '', 8)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e4b49237-001b-59f6-a5a4-18c5b8cdf44a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '749c3f3b-825c-5ec0-9df1-4f14516f905f', 9, 'Space Complexity', 'Easy', '', 9)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('311e8b7d-50c5-5721-ba72-374d3e07bca9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', 'c596f8f7-24c2-5970-ab5e-f1c31982a449', 10, 'Patterns 1 to 22 (stars, numbers, alphabets, triangles, diamonds, hollow shapes)', 'Easy', '', 10)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e5e67369-2cfe-5b98-b80c-2952438d42c5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '2198b950-fd74-5d78-be19-cdb50d5dfe44', 11, 'Pairs', 'Easy', '', 11)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1e750c0b-6587-5aab-98cb-5b13928b81ab', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '2198b950-fd74-5d78-be19-cdb50d5dfe44', 12, 'Vector', 'Easy', '', 12)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('abe6264b-d0ab-5456-9f9c-6fe4058a4903', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '2198b950-fd74-5d78-be19-cdb50d5dfe44', 13, 'List', 'Easy', '', 13)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e420cf62-5afd-5716-ac50-5a96c93db458', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '2198b950-fd74-5d78-be19-cdb50d5dfe44', 14, 'Deque', 'Easy', '', 14)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('85187791-c8c5-5621-8641-1319dba46ea2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '2198b950-fd74-5d78-be19-cdb50d5dfe44', 15, 'Stack', 'Easy', '', 15)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('24449f42-9e5e-54b3-ac67-cd025a747abb', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '2198b950-fd74-5d78-be19-cdb50d5dfe44', 16, 'Queue', 'Easy', '', 16)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('87c85c22-a771-5e96-bc28-5c2c31848659', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '2198b950-fd74-5d78-be19-cdb50d5dfe44', 17, 'Priority Queue', 'Easy', '', 17)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('820108a6-ee25-5e48-b109-89ef81d1be55', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '2198b950-fd74-5d78-be19-cdb50d5dfe44', 18, 'Set / Multiset / Unordered Set', 'Easy', '', 18)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5a7e1118-2d7f-5373-96fe-ca909be630ab', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '2198b950-fd74-5d78-be19-cdb50d5dfe44', 19, 'Map / Multimap / Unordered Map', 'Easy', '', 19)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('73aad4d7-3c6c-58fe-ae37-9b2e71b0fa5b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '2198b950-fd74-5d78-be19-cdb50d5dfe44', 20, 'Algorithm helpers (sort, next_permutation, popcount, max/min element)', 'Easy', '', 20)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d3ed9c45-d084-55ea-bf8f-29408b35489f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '314668c3-58e1-5cc2-83fd-dea6a0b295e5', 21, 'Count Digits', 'Easy', '', 21)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bb187262-27a3-5d19-9f62-1818f25d7a1e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '314668c3-58e1-5cc2-83fd-dea6a0b295e5', 22, 'Reverse a Number', 'Easy', '', 22)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('39e6fcd2-0f1a-54fb-8a56-11a3081af1ad', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '314668c3-58e1-5cc2-83fd-dea6a0b295e5', 23, 'Check Palindrome', 'Easy', '', 23)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f142c199-b8f1-5a67-b199-fecf29f2125b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '314668c3-58e1-5cc2-83fd-dea6a0b295e5', 24, 'GCD / HCF', 'Easy', '', 24)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bfd86fb5-0876-5d84-a23e-21aded99461c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '314668c3-58e1-5cc2-83fd-dea6a0b295e5', 25, 'Armstrong Numbers', 'Easy', '', 25)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('48c997aa-4f8f-5081-ac74-1c7840f9ba9b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '314668c3-58e1-5cc2-83fd-dea6a0b295e5', 26, 'Print All Divisors', 'Easy', '', 26)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b26dfc34-d00f-5539-bf5c-681b3351c93e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '314668c3-58e1-5cc2-83fd-dea6a0b295e5', 27, 'Check for Prime', 'Easy', '', 27)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('40bb9728-121a-56c4-9ec7-510f181a4938', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '201ae15e-072b-573f-bd31-726f42a49830', 28, 'Print Name N Times', 'Easy', '', 28)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('8b4e05d6-d3fe-5b92-927c-bd72d7019917', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '201ae15e-072b-573f-bd31-726f42a49830', 29, 'Print 1 to N', 'Easy', '', 29)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a8c1f3c9-86d6-5505-a281-25988042fb85', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '201ae15e-072b-573f-bd31-726f42a49830', 30, 'Print N to 1', 'Easy', '', 30)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ad6810c8-4d9d-5f2e-aea1-853908c453bf', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '201ae15e-072b-573f-bd31-726f42a49830', 31, 'Sum of First N Numbers', 'Easy', '', 31)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c0c50438-1a4c-57f0-8d70-5c2d5880a542', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '201ae15e-072b-573f-bd31-726f42a49830', 32, 'Factorial of N', 'Easy', '', 32)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1ae88762-6c14-5c1d-8e82-fe5b21788232', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '201ae15e-072b-573f-bd31-726f42a49830', 33, 'Reverse an Array', 'Easy', '', 33)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2b847705-14ae-5854-b105-4091b9ecf74c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '201ae15e-072b-573f-bd31-726f42a49830', 34, 'Check Palindrome String', 'Easy', '', 34)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('21c93b75-b3b2-513a-8d8f-16b2e3686fce', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '201ae15e-072b-573f-bd31-726f42a49830', 35, 'Fibonacci Number', 'Easy', '', 35)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('79f549c5-688d-5213-9e34-78b2545361df', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '49b7fc87-2900-548c-9f63-464b928ee617', 36, 'Hashing Theory', 'Easy', '', 36)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('db624545-360d-5581-8efc-5017241f717c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '49b7fc87-2900-548c-9f63-464b928ee617', 37, 'Counting Frequencies of Array Elements', 'Easy', '', 37)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c2b2e165-f0b1-5e1e-9a63-bcc65371f4e0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '49b7fc87-2900-548c-9f63-464b928ee617', 38, 'Highest / Lowest Frequency Element', 'Easy', '', 38)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('862ea223-3b10-51a8-84f9-a9b0331f8d1a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '49b7fc87-2900-548c-9f63-464b928ee617', 39, 'Hashing Techniques (division, folding, mid-square)', 'Easy', '', 39)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('cb2c9bd7-5960-5ffc-ace4-ad64a6271a90', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '49b7fc87-2900-548c-9f63-464b928ee617', 40, 'Collisions', 'Easy', '', 40)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('affeec28-3152-519a-a0f1-d0205968bb84', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '49b7fc87-2900-548c-9f63-464b928ee617', 41, 'Linear Chaining', 'Easy', '', 41)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('cfaefcb1-2547-5727-8669-69b348094f5e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9fde9eed-11ea-5f47-9ef3-bbe24b12858c', '49b7fc87-2900-548c-9f63-464b928ee617', 42, 'Open Addressing', 'Easy', '', 42)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('57ab1a9d-8bd5-553e-82ae-660ec6644e08', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '145a38cd-4a49-5bfa-8e86-9a344641ec72', '8c02ad16-30f8-57ad-9f51-08fc35740b40', 43, 'Selection Sort', 'Easy', '', 43)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ae6bf48c-1859-52f7-b729-09b15398e0e4', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '145a38cd-4a49-5bfa-8e86-9a344641ec72', '8c02ad16-30f8-57ad-9f51-08fc35740b40', 44, 'Bubble Sort', 'Easy', '', 44)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('8a5ff272-9299-5d53-bb51-3198510ebd3e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '145a38cd-4a49-5bfa-8e86-9a344641ec72', '8c02ad16-30f8-57ad-9f51-08fc35740b40', 45, 'Insertion Sort', 'Easy', '', 45)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('4f6b9800-f6ca-504d-a943-34eda219ac08', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '145a38cd-4a49-5bfa-8e86-9a344641ec72', '370212d5-23b7-5726-b854-594cbb2a49a0', 46, 'Merge Sort', 'Medium', '', 46)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('8d00cefa-e234-5d25-9f99-13a1837319e1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '145a38cd-4a49-5bfa-8e86-9a344641ec72', '370212d5-23b7-5726-b854-594cbb2a49a0', 47, 'Recursive Bubble Sort', 'Easy', '', 47)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('96a31573-b5d5-5e84-9ed7-0c9b987e2797', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '145a38cd-4a49-5bfa-8e86-9a344641ec72', '370212d5-23b7-5726-b854-594cbb2a49a0', 48, 'Recursive Insertion Sort', 'Easy', '', 48)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('3e791cfe-9838-50c5-8af6-34be78d41da3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '145a38cd-4a49-5bfa-8e86-9a344641ec72', '370212d5-23b7-5726-b854-594cbb2a49a0', 49, 'Quick Sort', 'Medium', '', 49)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('82ab1171-bdba-5c2c-83eb-27fd285ef088', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 50, 'Largest Element in an Array', 'Easy', '', 50)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1439775e-e890-57e4-bea9-cdaeaacc1922', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 51, 'Second Largest Element', 'Easy', '', 51)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ece46104-88e6-5e86-9791-cb5119625122', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 52, 'Check if Array is Sorted', 'Easy', '', 52)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6b9402ed-d106-5f9c-a624-0171b6775239', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 53, 'Remove Duplicates from Sorted Array', 'Easy', '', 53)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('cce8927c-a0f5-5605-be96-2d4644957646', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 54, 'Left Rotate Array by One', 'Easy', '', 54)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('7af2305a-d8e9-58dc-a605-4d2430eb1385', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 55, 'Left Rotate Array by D Places', 'Easy', '', 55)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a6c28edd-fcc1-51dd-bb8c-bd8fcfd02d5b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 56, 'Move Zeros to End', 'Easy', '', 56)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('346f3761-82fc-5511-ad73-c5a182930311', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 57, 'Linear Search', 'Easy', '', 57)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9bacaee6-eb2b-5e30-a02e-6ac7edfb209d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 58, 'Union of Two Sorted Arrays', 'Easy', '', 58)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2466e2d6-a677-5264-8b3b-851a55274073', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 59, 'Find Missing Number', 'Easy', '', 59)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a430af25-0c0e-5c10-acdd-d2415c2456b6', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 60, 'Maximum Consecutive Ones', 'Easy', '', 60)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c4ac20ad-8010-5590-be17-cb69bc2b50ce', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 61, 'Number That Appears Once', 'Easy', '', 61)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('fca3eede-aee9-5e34-83c2-10dd6de68221', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 62, 'Longest Subarray with Sum K (Positives)', 'Medium', '', 62)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c577ea31-8951-55ff-bec7-741f17bf826f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', 'e96c480a-57ad-5a5a-823a-daf1671a8925', 63, 'Longest Subarray with Sum K (Positives and Negatives)', 'Medium', '', 63)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a89219ea-4022-5e2c-ad74-e9a8165d655e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 64, 'Two Sum', 'Easy', '', 64)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('60e30a7b-aab7-5fa7-9e7a-6165e5f0040d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 65, 'Sort an Array of 0s, 1s and 2s', 'Medium', '', 65)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f6be933f-4057-53a8-9001-a3082cf8f090', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 66, 'Majority Element (> n/2)', 'Medium', '', 66)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('fc54919d-e325-5ce9-9041-de84a8c9296a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 67, 'Kadane''s Algorithm (Maximum Subarray Sum)', 'Medium', '', 67)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('024fb81b-ab00-56ee-91f6-31fdc192591d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 68, 'Print Subarray with Maximum Sum', 'Medium', '', 68)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('3968f1ca-7f9a-535a-9a25-e80491803c17', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 69, 'Best Time to Buy and Sell Stock', 'Easy', '', 69)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('64298f15-9ca8-511f-b5e8-2c26275cda2f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 70, 'Rearrange Array Elements by Sign', 'Medium', '', 70)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1f2546b7-b06e-5185-ae81-e6fbca8c1c05', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 71, 'Next Permutation', 'Medium', '', 71)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('096f68dc-01ee-5927-bc63-bcd8050d8bd1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 72, 'Leaders in an Array', 'Easy', '', 72)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bb62b916-3334-530d-93ef-4cb199c30cf1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 73, 'Longest Consecutive Sequence', 'Medium', '', 73)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f7ff259f-0cea-57ac-9123-fe8910233ce0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 74, 'Set Matrix Zeros', 'Medium', '', 74)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b8ef60b1-6529-5be4-bbc5-a54352b7f8f2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 75, 'Rotate Matrix by 90 Degrees', 'Medium', '', 75)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b6ceb0c0-8c22-534d-9aac-96a12a5506d5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 76, 'Spiral Traversal of Matrix', 'Medium', '', 76)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('14236a02-47c4-5fe9-93f6-2e9933259f14', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '01a8e99e-7599-5a39-a4fe-9d1183e1a87f', 77, 'Count Subarrays with Sum K', 'Medium', '', 77)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2bd8b26a-9fc8-5b30-863e-711fdc251a0a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 78, 'Pascal''s Triangle', 'Medium', '', 78)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ef7020d0-79bb-5eca-be90-b8459f73bc6f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 79, 'Majority Element (> n/3)', 'Medium', '', 79)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('006088a5-57a8-5d8e-baa2-3aaefdad4cf4', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 80, '3Sum', 'Medium', '', 80)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9253ff4f-9c2c-56a6-b82a-592b3dc6eca3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 81, '4Sum', 'Medium', '', 81)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('717cef2d-3631-5318-ac5b-d3f2c52db749', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 82, 'Largest Subarray with 0 Sum', 'Medium', '', 82)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('87ffb89a-b570-5a58-9da5-290273b20416', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 83, 'Count Subarrays with XOR K', 'Medium', '', 83)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('13823ba8-f01d-52ad-85cd-394f0568c8db', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 84, 'Merge Overlapping Intervals', 'Medium', '', 84)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('36c6c5a5-7f88-555c-8924-e33b2c2a47fc', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 85, 'Merge Two Sorted Arrays Without Extra Space', 'Hard', '', 85)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f05bf351-32d6-5ec4-b2e1-40383e594639', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 86, 'Find Repeating and Missing Number', 'Hard', '', 86)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('3021b10b-f13c-5d90-8c04-cae8d5e67006', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 87, 'Count Inversions', 'Hard', '', 87)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('29fd554c-2df2-5078-a245-445e59c304ed', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 88, 'Reverse Pairs', 'Hard', '', 88)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('dc6ce305-a116-576c-a3ea-7f2ddc4b55ea', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'a72e5a79-d0e5-5b3e-820c-d505a3699dcf', '8368275a-a0f4-54b9-9a7e-8709aaf4e2d8', 89, 'Maximum Product Subarray', 'Medium', '', 89)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('04149c4a-839a-55d0-b817-fa365fc2d88f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 90, 'Binary Search Basics', 'Easy', '', 90)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('aeb16fc5-a63f-59f6-b774-355945929c1d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 91, 'Lower Bound', 'Easy', '', 91)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2cab9cc7-256e-5c8a-87fb-7db9dc95f8c6', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 92, 'Upper Bound', 'Easy', '', 92)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1ab63256-97b9-5af7-a2e1-1c54ef3f362d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 93, 'Search Insert Position', 'Easy', '', 93)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f2ca42f0-f526-5769-8520-83e82c7c952c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 94, 'Floor and Ceil in Sorted Array', 'Easy', '', 94)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2f28e5f1-0054-5f56-b898-4decd39eac2f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 95, 'First and Last Occurrence', 'Medium', '', 95)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('42e92261-b995-51f4-b315-372be3a4fc50', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 96, 'Count Occurrences', 'Easy', '', 96)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('826898a4-a78f-5d4a-a8d9-a6600e5463de', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 97, 'Search in Rotated Sorted Array I', 'Medium', '', 97)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('da03e30b-7a99-57cd-9faa-0f0fe0f755bb', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 98, 'Search in Rotated Sorted Array II', 'Medium', '', 98)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f88bc775-8d9a-57ef-8fa5-fd3643cae1f4', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 99, 'Minimum in Rotated Sorted Array', 'Medium', '', 99)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('830f9b85-ab57-54da-8a1c-3a78c10ada67', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 100, 'Number of Times Array is Rotated', 'Easy', '', 100)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2f5467f3-5464-57bc-b883-3f150b2e3af8', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 101, 'Single Element in Sorted Array', 'Medium', '', 101)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0d7352bc-2e6a-5220-b011-27699d9e072f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '406bb1c3-e915-52f0-870b-ae4fa4abe1a6', 102, 'Find Peak Element', 'Medium', '', 102)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b2c1bec0-e241-5e0e-94a2-93e558c110f8', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 103, 'Square Root of a Number', 'Easy', '', 103)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6a5891dc-26d7-52bd-ad97-0b08eef3e5e0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 104, 'Nth Root of a Number', 'Easy', '', 104)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bb4553fe-8af7-5baa-981a-084552c0283e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 105, 'Koko Eating Bananas', 'Medium', '', 105)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('558a456b-b5b5-58c4-9fe8-66019470e440', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 106, 'Minimum Days to Make M Bouquets', 'Medium', '', 106)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('004f569d-f875-5d00-bfe9-8ab7f67ed65a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 107, 'Smallest Divisor Given a Threshold', 'Medium', '', 107)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('00d44218-8680-5338-b31b-749aeba0272a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 108, 'Capacity to Ship Packages', 'Medium', '', 108)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('20f9d72e-2b66-5768-9a8c-3525d67775e2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 109, 'Kth Missing Positive Number', 'Easy', '', 109)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d0aa77fd-ff01-5afe-89ec-cbea0792bc78', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 110, 'Aggressive Cows', 'Hard', '', 110)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('90cef7ce-6c94-537c-8e74-2a90cf8eab0c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 111, 'Book Allocation Problem', 'Hard', '', 111)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('584fcf41-be19-5ed7-90f4-541d4b39e7f4', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 112, 'Split Array (Largest Sum)', 'Hard', '', 112)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ddaa8162-bdba-57d0-847d-e11c6993ab7a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 113, 'Painter''s Partition', 'Hard', '', 113)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b9d1c63e-3b07-54e1-87a2-faaa28750cf9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 114, 'Minimize Maximum Distance to Gas Station', 'Hard', '', 114)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('7fcfab1d-fc3d-5805-b159-c87baa117528', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 115, 'Median of Two Sorted Arrays', 'Hard', '', 115)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c61caab9-4e5d-5e36-acd2-d242b6d93d3e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', '19e429b8-0232-53df-8a94-5e41ea25f4d7', 116, 'Kth Element of Two Sorted Arrays', 'Medium', '', 116)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('50354545-56c7-51c7-ae18-b667eb97c0b2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', 'fb072acf-95fe-51a4-ad37-392493010192', 117, 'Row with Maximum 1s', 'Easy', '', 117)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6e9db755-b8b5-5bbf-a9d8-d5bb7b67c948', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', 'fb072acf-95fe-51a4-ad37-392493010192', 118, 'Search in a 2D Matrix I', 'Medium', '', 118)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('79627bc1-c007-5f5c-a917-8b03a6e98f05', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', 'fb072acf-95fe-51a4-ad37-392493010192', 119, 'Search in a 2D Matrix II', 'Medium', '', 119)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('42fb661b-af88-509f-9d6b-f038b67e78a4', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', 'fb072acf-95fe-51a4-ad37-392493010192', 120, 'Peak Element in 2D Matrix', 'Medium', '', 120)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('68c3c4c9-e1b2-50e8-9f75-788f83e0753c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a22a4f6-bcd6-5f21-8ef8-964c1feb0b86', 'fb072acf-95fe-51a4-ad37-392493010192', 121, 'Median of a Row-wise Sorted Matrix', 'Hard', '', 121)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d1231121-865f-5e84-b351-f74255b50b10', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', 'ff865e3f-2f01-5fa8-a8f9-ec685dc733f5', 122, 'Remove Outermost Parentheses', 'Easy', '', 122)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d25ec428-f1cb-5226-b15f-bb9b5ba58934', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', 'ff865e3f-2f01-5fa8-a8f9-ec685dc733f5', 123, 'Reverse Words in a String', 'Medium', '', 123)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b2fbeb56-a77a-5299-a4a9-516b669658c3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', 'ff865e3f-2f01-5fa8-a8f9-ec685dc733f5', 124, 'Largest Odd Number in a String', 'Easy', '', 124)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ee6c3c65-57a2-5db7-beb5-41c956157f04', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', 'ff865e3f-2f01-5fa8-a8f9-ec685dc733f5', 125, 'Longest Common Prefix', 'Easy', '', 125)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d18b7495-8eaa-5e32-81d5-7caccf266cd3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', 'ff865e3f-2f01-5fa8-a8f9-ec685dc733f5', 126, 'Isomorphic Strings', 'Easy', '', 126)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('7b7fa907-a510-560e-8ffa-5992cbc45eca', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', 'ff865e3f-2f01-5fa8-a8f9-ec685dc733f5', 127, 'Rotate String', 'Easy', '', 127)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5c464eb6-3317-5636-b999-9cc4df4c16d3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', 'ff865e3f-2f01-5fa8-a8f9-ec685dc733f5', 128, 'Valid Anagram', 'Easy', '', 128)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('4a5ca414-9b24-5e91-bd8f-62f25633f143', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', 'ff865e3f-2f01-5fa8-a8f9-ec685dc733f5', 129, 'Sort Characters by Frequency', 'Medium', '', 129)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('deb10176-0310-5200-bfee-de91d746c0b2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', '7fb72de0-b280-5b23-85ea-65dd3541f0da', 130, 'Maximum Nesting Depth of Parentheses', 'Easy', '', 130)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c9eec901-9ead-591d-a0cf-cbf0c402cea9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', '7fb72de0-b280-5b23-85ea-65dd3541f0da', 131, 'Roman to Integer', 'Easy', '', 131)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0e3a222e-2969-52fa-a543-8b0ea9f5ca4f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', '7fb72de0-b280-5b23-85ea-65dd3541f0da', 132, 'Integer to Roman', 'Medium', '', 132)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('85fb3f3e-b499-5a61-9580-21cf462a89e2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', '7fb72de0-b280-5b23-85ea-65dd3541f0da', 133, 'Implement Atoi', 'Medium', '', 133)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e90166d1-43db-54ef-acb2-c6a6397b421f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', '7fb72de0-b280-5b23-85ea-65dd3541f0da', 134, 'Count Number of Substrings', 'Medium', '', 134)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1ed3eeac-962d-5bc0-bfc8-b7dc43fc0242', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', '7fb72de0-b280-5b23-85ea-65dd3541f0da', 135, 'Longest Palindromic Substring', 'Medium', '', 135)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('63ad6e86-d4b7-54fe-a515-77af121bcc52', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', '7fb72de0-b280-5b23-85ea-65dd3541f0da', 136, 'Sum of Beauty of All Substrings', 'Medium', '', 136)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9c73520d-89ae-511f-830e-7fae583cd1cb', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '51584254-3699-5643-987f-284f4ab13aee', '7fb72de0-b280-5b23-85ea-65dd3541f0da', 137, 'Reverse Every Word in a String', 'Medium', '', 137)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('62eb445f-77f4-50d7-a55a-f8946646fad7', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '090735b3-1301-5f45-b97c-26e2dd5c60c4', 138, 'Introduction to Linked List', 'Easy', '', 138)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('305a36a1-1f95-5dc9-bb96-1ad4cbf44c1f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '090735b3-1301-5f45-b97c-26e2dd5c60c4', 139, 'Insert a Node', 'Easy', '', 139)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('55e2168a-6a7d-5c59-9681-265f742c821f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '090735b3-1301-5f45-b97c-26e2dd5c60c4', 140, 'Delete a Node', 'Easy', '', 140)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f77426e1-3b73-551b-ad29-8a1bbed3a423', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '090735b3-1301-5f45-b97c-26e2dd5c60c4', 141, 'Length of Linked List', 'Easy', '', 141)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('13afafa0-d25e-5df1-917a-e0cdd3f4f675', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '090735b3-1301-5f45-b97c-26e2dd5c60c4', 142, 'Search an Element', 'Easy', '', 142)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0a9b7426-7646-54ef-a462-aeedbb15b999', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '30bff249-bd9d-536e-89a2-e1abd2d96b7e', 143, 'Introduction to DLL', 'Easy', '', 143)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b78c85b9-49c0-55ff-a93b-04c267abdfa4', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '30bff249-bd9d-536e-89a2-e1abd2d96b7e', 144, 'Insert a Node', 'Easy', '', 144)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1a83968d-dd2c-5686-957b-fa71c7891e48', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '30bff249-bd9d-536e-89a2-e1abd2d96b7e', 145, 'Delete a Node', 'Easy', '', 145)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('4c75d4ba-1c1a-50e4-a8da-c79f6c4834bf', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', '30bff249-bd9d-536e-89a2-e1abd2d96b7e', 146, 'Reverse a DLL', 'Medium', '', 146)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e826e28b-b328-5c15-88cc-b09314520e16', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 147, 'Middle of Linked List', 'Easy', '', 147)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9b97e73d-16bf-5ec0-a0b2-3a3ca60fecb0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 148, 'Reverse LL (Iterative)', 'Easy', '', 148)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6bfbda7a-c3f0-50ca-886e-eb7f1a90ee18', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 149, 'Reverse LL (Recursive)', 'Easy', '', 149)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('8e115048-b41d-5299-afc5-c68463e81eef', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 150, 'Detect a Loop', 'Easy', '', 150)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('38045b7f-7e9e-5aae-bf91-b46499611734', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 151, 'Starting Point of Loop', 'Medium', '', 151)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('37371c97-b4af-5f3b-9705-4b0d8d309c1c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 152, 'Length of Loop', 'Easy', '', 152)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9e8fd87c-161c-5940-a64b-033af0a3bbe1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 153, 'Check if LL is Palindrome', 'Easy', '', 153)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0a0e63a1-a276-5e16-ab38-3fe2a4d88287', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 154, 'Segregate Odd and Even Nodes', 'Medium', '', 154)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5c874b07-fc57-5bed-9e8d-90874ad14f12', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 155, 'Remove Nth Node from End', 'Medium', '', 155)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('aae87c4b-e534-582a-a6d9-5230a6c479b9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 156, 'Delete Middle Node', 'Medium', '', 156)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d2ebe6ec-f497-5430-944c-c416e5ae90ef', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 157, 'Sort a Linked List', 'Medium', '', 157)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('8493143f-7b08-5db2-8f78-53f8b78333d1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 158, 'Sort LL of 0s, 1s and 2s', 'Easy', '', 158)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1b88f9af-0d78-5097-99ee-b230a548fe75', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 159, 'Intersection of Two Linked Lists', 'Easy', '', 159)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1839d949-c6cd-5cab-9d15-aeebc14bb66d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 160, 'Add 1 to a Number Represented by LL', 'Medium', '', 160)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('091f6060-828a-5c92-ba7e-7d21e0f23d51', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'c3647b9f-2bd9-5e30-89b0-67085f147ddb', 161, 'Add Two Numbers', 'Medium', '', 161)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0ba5f2f3-a131-5640-9f59-62389d38cd9d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'eaa8309b-b1d6-5d1c-893b-c03bdbad546e', 162, 'Delete All Occurrences of a Key', 'Medium', '', 162)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5a5b4224-0305-5369-aee3-f80035dff1c2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'eaa8309b-b1d6-5d1c-893b-c03bdbad546e', 163, 'Find Pairs with Given Sum', 'Easy', '', 163)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('284e1780-20bf-580c-b34d-80ff52f0067d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'eaa8309b-b1d6-5d1c-893b-c03bdbad546e', 164, 'Remove Duplicates from Sorted DLL', 'Easy', '', 164)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e8e334db-b3b2-5034-bf11-1f312c385866', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'ef42b94c-000e-541c-800a-94507e19b656', 165, 'Reverse Nodes in K-Group', 'Hard', '', 165)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e23cab37-963d-5108-884d-4ea497824428', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'ef42b94c-000e-541c-800a-94507e19b656', 166, 'Rotate a Linked List', 'Medium', '', 166)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f3bf5e8a-ce3d-5c8b-aa1d-1323a9d12fd7', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'ef42b94c-000e-541c-800a-94507e19b656', 167, 'Flatten a Linked List', 'Medium', '', 167)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2391b26e-a7e1-5734-9b5f-fa16940472ef', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '8ee3da7c-be4d-5eb1-812a-cd0e6d4e5001', 'ef42b94c-000e-541c-800a-94507e19b656', 168, 'Clone LL with Random Pointer', 'Hard', '', 168)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c6ff9933-c6e0-5872-90b5-a863662e82c9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b2a16a7e-378d-51e6-bab3-d14b720deffb', 169, 'Recursive Implementation of Atoi', 'Medium', '', 169)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bb68b608-8cfe-5692-ac4e-79526cc7c7d1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b2a16a7e-378d-51e6-bab3-d14b720deffb', 170, 'Pow(x, n)', 'Medium', '', 170)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('90551896-2049-568d-83cc-12f29d17f6fd', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b2a16a7e-378d-51e6-bab3-d14b720deffb', 171, 'Count Good Numbers', 'Medium', '', 171)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2eb228f5-3a64-5c97-8cd9-2f58476cf37a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b2a16a7e-378d-51e6-bab3-d14b720deffb', 172, 'Sort a Stack Using Recursion', 'Medium', '', 172)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('72f96ace-e71d-5c33-b064-3709f5172157', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b2a16a7e-378d-51e6-bab3-d14b720deffb', 173, 'Reverse a Stack Using Recursion', 'Medium', '', 173)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0db6a3f1-396c-565a-a501-8b42e5c23c2d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b2a16a7e-378d-51e6-bab3-d14b720deffb', 174, 'Generate Parentheses', 'Medium', '', 174)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a169ad7f-51f4-5f81-beba-976022190474', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'bc428a08-6f18-55ae-aa49-5149f2554427', 175, 'Print All Subsequences', 'Medium', '', 175)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('41641cd8-3869-5a14-9454-8bcf32971023', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'bc428a08-6f18-55ae-aa49-5149f2554427', 176, 'Count Subsequences with Sum K', 'Medium', '', 176)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('aa24a03c-0bc7-5e46-85c0-357fba2194b0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'bc428a08-6f18-55ae-aa49-5149f2554427', 177, 'Check if Subsequence with Sum K Exists', 'Medium', '', 177)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5a828e90-2fe9-5a85-811e-d63a31b00444', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'bc428a08-6f18-55ae-aa49-5149f2554427', 178, 'Combination Sum I', 'Medium', '', 178)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('3aa76569-81e0-59d2-860d-78b6479e877b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'bc428a08-6f18-55ae-aa49-5149f2554427', 179, 'Combination Sum II', 'Medium', '', 179)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5d8d5306-e0e5-5c2f-a5ee-7ca65bc69288', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'bc428a08-6f18-55ae-aa49-5149f2554427', 180, 'Combination Sum III', 'Medium', '', 180)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('63b51bbc-3430-54bd-a106-f64459caf10d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'bc428a08-6f18-55ae-aa49-5149f2554427', 181, 'Subset Sum I', 'Medium', '', 181)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e4433799-79f4-50ba-b42e-35ba03af05ce', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'bc428a08-6f18-55ae-aa49-5149f2554427', 182, 'Subset Sum II', 'Medium', '', 182)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('71995b0a-60a3-5916-b565-e4c434837ad9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'bc428a08-6f18-55ae-aa49-5149f2554427', 183, 'Letter Combinations of a Phone Number', 'Medium', '', 183)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b580a6d6-ad15-5701-b9b4-29d47fd3373e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b63a9b3d-2bdb-53d0-96a8-f8f9cf81b1b8', 184, 'Palindrome Partitioning', 'Medium', '', 184)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('96939464-82c9-5750-959b-77ef16506679', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b63a9b3d-2bdb-53d0-96a8-f8f9cf81b1b8', 185, 'Word Search', 'Medium', '', 185)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('34b93a9a-6f0b-53e9-b195-384b29af296c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b63a9b3d-2bdb-53d0-96a8-f8f9cf81b1b8', 186, 'N-Queens', 'Hard', '', 186)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('475f94bb-1ce8-5522-bb7f-b67fce43b7be', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b63a9b3d-2bdb-53d0-96a8-f8f9cf81b1b8', 187, 'Rat in a Maze', 'Medium', '', 187)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('7be5d0e6-abbb-5c6e-806a-81ab7169ce29', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b63a9b3d-2bdb-53d0-96a8-f8f9cf81b1b8', 188, 'Word Break', 'Medium', '', 188)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('57a6d4a7-a78b-52d7-991e-e62240835d2e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b63a9b3d-2bdb-53d0-96a8-f8f9cf81b1b8', 189, 'M-Coloring Problem', 'Medium', '', 189)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('15f5e9b3-82ed-5186-88c9-61200da8df77', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b63a9b3d-2bdb-53d0-96a8-f8f9cf81b1b8', 190, 'Sudoku Solver', 'Hard', '', 190)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1f48fd9b-1a81-55d9-bcb5-f20564d53840', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f8b494d-fc79-5177-962f-0acdfba27b55', 'b63a9b3d-2bdb-53d0-96a8-f8f9cf81b1b8', 191, 'Expression Add Operators', 'Hard', '', 191)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a4d182c0-fec6-507a-b99a-ccf7b6beed02', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '1c71f4ab-7d8c-5503-a22b-aa87a7a58c86', 192, 'Introduction to Bit Manipulation', 'Easy', '', 192)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('16b5f90c-4fba-5222-9d52-b3848f983cee', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '1c71f4ab-7d8c-5503-a22b-aa87a7a58c86', 193, 'Check if ith Bit is Set', 'Easy', '', 193)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('67915fb8-59c2-5c70-9c11-8d113c62e9ff', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '1c71f4ab-7d8c-5503-a22b-aa87a7a58c86', 194, 'Check if Number is Odd or Even', 'Easy', '', 194)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2e72b203-9514-5bd8-a6ec-4b2cf359be11', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '1c71f4ab-7d8c-5503-a22b-aa87a7a58c86', 195, 'Check if Number is Power of 2', 'Easy', '', 195)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e908fca4-faaf-5cb2-8bbe-0fd61dcd5358', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '1c71f4ab-7d8c-5503-a22b-aa87a7a58c86', 196, 'Count Number of Set Bits', 'Easy', '', 196)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ea16490d-e20b-536e-951e-a2cf27e08da9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '1c71f4ab-7d8c-5503-a22b-aa87a7a58c86', 197, 'Set / Clear the ith Bit', 'Easy', '', 197)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d2fc6e75-9ff7-5e5f-a2fe-aa8d868f4e3f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '1c71f4ab-7d8c-5503-a22b-aa87a7a58c86', 198, 'Swap Two Numbers Using XOR', 'Easy', '', 198)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b8f2a6fc-cf5c-53e7-835c-620b2fdc1203', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '1c71f4ab-7d8c-5503-a22b-aa87a7a58c86', 199, 'Divide Two Integers Without Using Division', 'Medium', '', 199)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('65cc605c-7797-5f82-a6cc-c8eec611e394', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '4921a4b0-0a0e-5709-a687-8f2c61ea29c0', 200, 'Minimum Bit Flips to Convert Number', 'Easy', '', 200)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('3e2f1c7f-e346-5d71-be47-3a5433cd79b5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '4921a4b0-0a0e-5709-a687-8f2c61ea29c0', 201, 'Find the Number That Appears Odd Number of Times', 'Easy', '', 201)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0a5f9af2-bb32-56f8-868b-8cdd736971f6', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '4921a4b0-0a0e-5709-a687-8f2c61ea29c0', 202, 'Power Set (Using Bit Manipulation)', 'Medium', '', 202)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('45dff1de-1698-52a0-9688-23fc84fbf775', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '4921a4b0-0a0e-5709-a687-8f2c61ea29c0', 203, 'Find XOR of Numbers from L to R', 'Easy', '', 203)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f80834d7-3a5f-5531-86a7-581783ebbd41', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '4921a4b0-0a0e-5709-a687-8f2c61ea29c0', 204, 'Find Two Numbers Appearing Odd Number of Times', 'Medium', '', 204)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1568c002-567e-54f3-bdde-8fd7a49de66b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '46b741df-3b19-5e5f-a7d6-8e0aafdae5cd', 205, 'Prime Factors of a Number', 'Easy', '', 205)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1caac39a-edbb-53bd-892f-382593f257c0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '46b741df-3b19-5e5f-a7d6-8e0aafdae5cd', 206, 'All Divisors of a Number', 'Easy', '', 206)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6f199cf9-deba-5ce5-9707-e3177cf683c1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '46b741df-3b19-5e5f-a7d6-8e0aafdae5cd', 207, 'Sieve of Eratosthenes', 'Medium', '', 207)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('7a50eaed-c08a-520d-810c-802da5d59df4', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '46b741df-3b19-5e5f-a7d6-8e0aafdae5cd', 208, 'Find Prime Factorisation of a Number Using Sieve', 'Medium', '', 208)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('4e2504f1-fbd3-5aec-9dff-179e6b32c9e6', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3f6be3d6-f16e-552e-8c80-6680d08c97d6', '46b741df-3b19-5e5f-a7d6-8e0aafdae5cd', 209, 'Power(n, x)', 'Medium', '', 209)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('3ac4329e-4fcb-5167-9bac-1326bedb23ec', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'e5d4d43c-bd72-566b-8b8d-c42223fd8751', 210, 'Implement Stack Using Arrays', 'Easy', '', 210)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2893619c-4ef3-5e6b-800b-ebe417ec4bd7', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'e5d4d43c-bd72-566b-8b8d-c42223fd8751', 211, 'Implement Queue Using Arrays', 'Easy', '', 211)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('459daaf8-0a57-5e12-a9fb-61a2c6c6f85f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'e5d4d43c-bd72-566b-8b8d-c42223fd8751', 212, 'Implement Stack Using Queue', 'Easy', '', 212)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a83c333c-3064-591e-9d5c-e59c23dddc7b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'e5d4d43c-bd72-566b-8b8d-c42223fd8751', 213, 'Implement Queue Using Stack', 'Easy', '', 213)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('72f3b4b2-abdf-569d-a694-4fbfcb6d318b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'e5d4d43c-bd72-566b-8b8d-c42223fd8751', 214, 'Implement Stack Using Linked List', 'Easy', '', 214)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('caff25dd-20f4-5b43-a7f4-6900597a9dda', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'e5d4d43c-bd72-566b-8b8d-c42223fd8751', 215, 'Implement Queue Using Linked List', 'Easy', '', 215)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b14a9490-3523-5692-8f1d-d1f2b8b23763', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'e5d4d43c-bd72-566b-8b8d-c42223fd8751', 216, 'Check for Balanced Parentheses', 'Easy', '', 216)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bd0344d1-8510-5b79-8567-eef1b93ba193', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'e5d4d43c-bd72-566b-8b8d-c42223fd8751', 217, 'Implement Min Stack', 'Medium', '', 217)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('312e38dc-34c7-57aa-91eb-393806d331e0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '2fa8ff44-4e32-5e45-9f2c-8cadcb33f061', 218, 'Infix to Postfix', 'Medium', '', 218)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0875dd20-bcb1-5830-826f-e33a0a9e1f6b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '2fa8ff44-4e32-5e45-9f2c-8cadcb33f061', 219, 'Prefix to Infix', 'Medium', '', 219)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('4b7dec27-71a6-5ee8-acd7-b22a9ad796d5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '2fa8ff44-4e32-5e45-9f2c-8cadcb33f061', 220, 'Prefix to Postfix', 'Medium', '', 220)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('896aba42-2b11-568d-a392-8934713bca2d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '2fa8ff44-4e32-5e45-9f2c-8cadcb33f061', 221, 'Postfix to Prefix', 'Medium', '', 221)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('35090ce5-f827-532a-a50a-6550f8edc5ae', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '2fa8ff44-4e32-5e45-9f2c-8cadcb33f061', 222, 'Postfix to Infix', 'Medium', '', 222)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('373fb898-989b-5bcc-ac78-39bb2a5b9321', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '2fa8ff44-4e32-5e45-9f2c-8cadcb33f061', 223, 'Infix to Prefix', 'Medium', '', 223)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d09bdd83-fa89-52c6-af1e-100d20b810c5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'f354bae1-a0dd-5053-8bcf-7ddc174262fe', 224, 'Next Greater Element I', 'Easy', '', 224)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ed7b5661-b221-5f61-9fd2-7144d2b85394', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'f354bae1-a0dd-5053-8bcf-7ddc174262fe', 225, 'Next Greater Element II', 'Medium', '', 225)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('956feb4c-c97a-5d1e-b047-3ae7e4c6f3eb', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'f354bae1-a0dd-5053-8bcf-7ddc174262fe', 226, 'Next Smaller Element', 'Easy', '', 226)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('8dea3f4b-346c-5b1e-a55c-56e67b4e1855', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'f354bae1-a0dd-5053-8bcf-7ddc174262fe', 227, 'Number of NGEs to the Right', 'Medium', '', 227)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d9adb7ee-0bf3-537b-8922-8dd3e6b5be91', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'f354bae1-a0dd-5053-8bcf-7ddc174262fe', 228, 'Trapping Rainwater', 'Hard', '', 228)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('dcd26ca2-58c1-53e2-8b73-069a6852192e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'f354bae1-a0dd-5053-8bcf-7ddc174262fe', 229, 'Sum of Subarray Minimums', 'Medium', '', 229)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5ed343ed-346f-5ed6-88e3-8239d2872384', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'f354bae1-a0dd-5053-8bcf-7ddc174262fe', 230, 'Asteroid Collision', 'Medium', '', 230)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5ccf1610-914e-552d-b256-4a26cbaf20af', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'f354bae1-a0dd-5053-8bcf-7ddc174262fe', 231, 'Sum of Subarray Ranges', 'Medium', '', 231)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('668797ee-c710-5203-bd14-86fd4a2e1e5d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'f354bae1-a0dd-5053-8bcf-7ddc174262fe', 232, 'Remove K Digits', 'Medium', '', 232)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('213a46be-0fe2-50ec-a279-fe8e7d23d9b5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'f354bae1-a0dd-5053-8bcf-7ddc174262fe', 233, 'Largest Rectangle in Histogram', 'Hard', '', 233)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5405819b-65f1-51b6-a802-4ee966f13e8f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', 'f354bae1-a0dd-5053-8bcf-7ddc174262fe', 234, 'Maximal Rectangles', 'Hard', '', 234)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('897f808c-d261-5394-8d30-a3ac51c7fb47', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '1ef1dfce-5ba7-5f0f-bea3-44e82e76e0bb', 235, 'Sliding Window Maximum', 'Hard', '', 235)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9cc1374c-3328-54b7-ae0e-2cdd990ce809', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '1ef1dfce-5ba7-5f0f-bea3-44e82e76e0bb', 236, 'Stock Span Problem', 'Medium', '', 236)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e53f973a-207a-5cef-b223-7774fa1f8816', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '1ef1dfce-5ba7-5f0f-bea3-44e82e76e0bb', 237, 'Celebrity Problem', 'Medium', '', 237)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('164352a7-6b6c-5087-94b8-0799ef5688cd', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '1ef1dfce-5ba7-5f0f-bea3-44e82e76e0bb', 238, 'LRU Cache', 'Hard', '', 238)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('048e02b4-41b5-55e7-93dc-f8b1c6bd6007', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'c47fad05-ab4d-51ed-8889-3eac720660b5', '1ef1dfce-5ba7-5f0f-bea3-44e82e76e0bb', 239, 'LFU Cache', 'Hard', '', 239)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1b12715d-7a19-569c-b9a8-c5f389cbeb33', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '2d9ea744-14e2-5504-8d5d-e1c145408acc', 240, 'Longest Substring Without Repeating Characters', 'Medium', '', 240)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('698448f9-35e2-5448-9dd1-5bef1e729937', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '2d9ea744-14e2-5504-8d5d-e1c145408acc', 241, 'Max Consecutive Ones III', 'Medium', '', 241)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2bff5172-e118-5385-8f55-c3f483f65d9b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '2d9ea744-14e2-5504-8d5d-e1c145408acc', 242, 'Fruit Into Baskets', 'Medium', '', 242)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c93ea94b-26a9-57d6-b43a-e803551cf98d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '2d9ea744-14e2-5504-8d5d-e1c145408acc', 243, 'Longest Repeating Character Replacement', 'Medium', '', 243)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('26a85c8b-6f9a-57ac-8894-4ee09ff5d699', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '2d9ea744-14e2-5504-8d5d-e1c145408acc', 244, 'Binary Subarrays with Sum', 'Medium', '', 244)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d3d1fa5f-c451-5fe5-98ae-94ba389438cd', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '2d9ea744-14e2-5504-8d5d-e1c145408acc', 245, 'Count Number of Nice Subarrays', 'Medium', '', 245)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c9b4a3b5-1694-58e6-8617-b13801132053', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '2d9ea744-14e2-5504-8d5d-e1c145408acc', 246, 'Number of Substrings Containing All Three Characters', 'Medium', '', 246)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('54592041-b983-5b3d-9037-1ca7aa19d128', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '2d9ea744-14e2-5504-8d5d-e1c145408acc', 247, 'Maximum Points You Can Obtain from Cards', 'Medium', '', 247)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('7cba3072-3ab2-56da-af9e-3672f4701cb2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '8e03bf70-82ab-57e9-a7c0-c85f633ce462', 248, 'Longest Substring with At Most K Distinct Characters', 'Medium', '', 248)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('13a1cdcd-32dc-51d7-be42-c9e42b603cf0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '8e03bf70-82ab-57e9-a7c0-c85f633ce462', 249, 'Subarrays with K Different Integers', 'Hard', '', 249)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d35b238e-c8f7-55b6-991f-790b5322d6d9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '8e03bf70-82ab-57e9-a7c0-c85f633ce462', 250, 'Minimum Window Substring', 'Hard', '', 250)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('03220970-e13a-538f-ab54-34411558c062', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '07c97af5-e42d-5f5f-840c-c3b210d57f1e', '8e03bf70-82ab-57e9-a7c0-c85f633ce462', 251, 'Minimum Window Subsequence', 'Hard', '', 251)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('fa499a60-973c-523b-bf0e-e5a716030955', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', '2697bfcd-f7f9-5cf7-926b-b215f2b8eb51', 252, 'Introduction to Priority Queue', 'Easy', '', 252)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('10b49bba-6423-52d6-a008-ac2bfb82f290', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', '2697bfcd-f7f9-5cf7-926b-b215f2b8eb51', 253, 'Min Heap / Max Heap Implementation', 'Medium', '', 253)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5fc47734-c378-5df6-85d5-0e142cea989a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', '2697bfcd-f7f9-5cf7-926b-b215f2b8eb51', 254, 'Check if Array Represents a Min-Heap', 'Easy', '', 254)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('40de06b9-6dce-57e8-9038-a3576544785c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', '2697bfcd-f7f9-5cf7-926b-b215f2b8eb51', 255, 'Convert Min-Heap to Max-Heap', 'Medium', '', 255)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c40df00f-7a15-500b-b27d-440a4095fde5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', '2697bfcd-f7f9-5cf7-926b-b215f2b8eb51', 256, 'Heapify Algorithm', 'Medium', '', 256)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bb3e0bdc-ce66-536a-8eb9-05a8ddf641a1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', '2697bfcd-f7f9-5cf7-926b-b215f2b8eb51', 257, 'Build Heap', 'Medium', '', 257)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d39c23d5-fd52-547d-8ccf-7b89b4428925', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', '2697bfcd-f7f9-5cf7-926b-b215f2b8eb51', 258, 'Heap Sort', 'Medium', '', 258)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ae0cc0d4-5cd1-5ae5-938f-69a427d80503', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'c6f3800e-3b34-5342-b86a-0ab7d63735c2', 259, 'Kth Largest Element in an Array', 'Medium', '', 259)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('851f5506-fbf8-5fa0-9724-fb1de085f0d5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'c6f3800e-3b34-5342-b86a-0ab7d63735c2', 260, 'Sort a K-Sorted Array', 'Medium', '', 260)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ec463866-2e07-5de1-80e1-3fb8a0f8da71', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'c6f3800e-3b34-5342-b86a-0ab7d63735c2', 261, 'Merge K Sorted Arrays', 'Medium', '', 261)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5b6c6ffe-7ebb-597f-81dc-08ff1ef82a51', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'c6f3800e-3b34-5342-b86a-0ab7d63735c2', 262, 'Replace Elements by Rank', 'Easy', '', 262)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0ace6f1c-e088-52ba-892b-7d1073521878', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'c6f3800e-3b34-5342-b86a-0ab7d63735c2', 263, 'Task Scheduler', 'Medium', '', 263)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f48c0a0b-84b6-52c8-8461-8cb0c41d0395', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'c6f3800e-3b34-5342-b86a-0ab7d63735c2', 264, 'Hands of Straights', 'Medium', '', 264)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('13bb96c3-1acd-513a-93d3-18d2e6c5004f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'b1a7b19d-8a8b-5fab-a9d5-7bc564760e68', 265, 'Design Twitter', 'Medium', '', 265)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a4cdceef-c463-56ce-b054-b7359996225f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'b1a7b19d-8a8b-5fab-a9d5-7bc564760e68', 266, 'Connect N Ropes', 'Easy', '', 266)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('3fca8683-d4f0-508a-8d7a-a804d14ebb42', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'b1a7b19d-8a8b-5fab-a9d5-7bc564760e68', 267, 'Kth Largest Element in a Stream', 'Easy', '', 267)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('7985f14c-9f59-576d-a1f8-9b3d34fd2786', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'b1a7b19d-8a8b-5fab-a9d5-7bc564760e68', 268, 'Maximum Sum Combination', 'Medium', '', 268)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9e0871a5-f625-5b5c-9fc3-f5984f64fe1d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'b1a7b19d-8a8b-5fab-a9d5-7bc564760e68', 269, 'Find Median from Data Stream', 'Hard', '', 269)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('70310383-bc1a-5b70-8ece-572b89ccbcc0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', 'f7638f87-68d0-5ed7-ac4c-24d55ab1b969', 'b1a7b19d-8a8b-5fab-a9d5-7bc564760e68', 270, 'K Most Frequent Elements', 'Medium', '', 270)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('71545fa6-f0c8-53ea-9f89-0f18549cf92a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', 'ea3068dd-f490-50dc-be11-275f42dd5eef', 271, 'Assign Cookies', 'Easy', '', 271)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('448c2c7b-111a-5150-843c-fbad6da243b9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', 'ea3068dd-f490-50dc-be11-275f42dd5eef', 272, 'Fractional Knapsack', 'Medium', '', 272)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('971c7763-0de4-55b0-80ed-55e9cb277420', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', 'ea3068dd-f490-50dc-be11-275f42dd5eef', 273, 'Minimum Number of Coins', 'Medium', '', 273)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('7d26d4e7-3bc8-58f1-a907-7c36294acef3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', 'ea3068dd-f490-50dc-be11-275f42dd5eef', 274, 'Lemonade Change', 'Easy', '', 274)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9d207fe6-4f61-52e0-aead-b03bae17004e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', 'ea3068dd-f490-50dc-be11-275f42dd5eef', 275, 'Valid Parenthesis Checker', 'Medium', '', 275)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('18c6f5ad-26c9-5957-9130-9230ee7b2016', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '3ac3d8a6-4001-5b89-a48f-180906343b93', 276, 'N Meetings in One Room', 'Easy', '', 276)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('73d0a501-d002-52d7-9884-22f2553e672f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '3ac3d8a6-4001-5b89-a48f-180906343b93', 277, 'Jump Game I', 'Medium', '', 277)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('dcc92324-850c-5b4c-b6c7-38f65c979b4b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '3ac3d8a6-4001-5b89-a48f-180906343b93', 278, 'Jump Game II', 'Medium', '', 278)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('935b2743-cfc4-5c1e-bd20-1032370bbc1e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '3ac3d8a6-4001-5b89-a48f-180906343b93', 279, 'Minimum Number of Platforms', 'Medium', '', 279)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a8ec1fef-44ce-5ea3-8f74-6f18c1e445ea', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '3ac3d8a6-4001-5b89-a48f-180906343b93', 280, 'Job Sequencing Problem', 'Medium', '', 280)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('545bf3df-8fff-55b6-be41-751820c4e842', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '3ac3d8a6-4001-5b89-a48f-180906343b93', 281, 'Candy', 'Hard', '', 281)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9cdd930a-70d7-564f-afe4-8c0534a8fd85', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '3ac3d8a6-4001-5b89-a48f-180906343b93', 282, 'Shortest Job First', 'Easy', '', 282)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ae1cc6d8-8131-58f0-9240-582842db7f7e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '3ac3d8a6-4001-5b89-a48f-180906343b93', 283, 'Page Replacement Algorithm (LRU)', 'Medium', '', 283)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('264e01b5-d937-5267-bab3-494122056e47', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '3ac3d8a6-4001-5b89-a48f-180906343b93', 284, 'Insert Interval', 'Medium', '', 284)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('23f3ad24-83d9-5058-b0c1-a74017dbbf18', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '3ac3d8a6-4001-5b89-a48f-180906343b93', 285, 'Merge Intervals', 'Medium', '', 285)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5c490fad-4af5-5fb2-a070-966ade760da0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '9f892f92-7b77-5a63-b5ff-7a4263ba54ca', '3ac3d8a6-4001-5b89-a48f-180906343b93', 286, 'Non-overlapping Intervals', 'Medium', '', 286)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('8506ceaf-0089-5eb5-9456-2736b49d7d66', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', 287, 'Introduction to Trees', 'Easy', '', 287)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('52c4cc59-0e8b-50a2-8d92-ae39f1707933', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', 288, 'Binary Tree Representation', 'Easy', '', 288)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bb1615d8-5d44-516f-b59b-60723b046c68', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', 289, 'Preorder Traversal', 'Easy', '', 289)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a1bd8d6d-85e9-5aec-960b-af2ff3bc8d9b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', 290, 'Inorder Traversal', 'Easy', '', 290)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('70fa9890-2952-5d34-97d0-e480d9860111', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', 291, 'Postorder Traversal', 'Easy', '', 291)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d6cdf1d8-a5fb-5ce7-a167-1deb1d7fa0cf', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', 292, 'Level Order Traversal', 'Medium', '', 292)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1ffbd38e-0474-5e3c-ab4a-e03e930ef4af', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', 293, 'Iterative Preorder', 'Medium', '', 293)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('25c7776e-b4ca-5c0d-9f0f-d7aceb1d1c52', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', 294, 'Iterative Inorder', 'Medium', '', 294)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c1c00e04-aa0f-57fb-8a15-54874832c49e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', 295, 'Iterative Postorder (2 Stacks)', 'Medium', '', 295)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a0e6bf89-ad40-5fe8-8d93-96f11cd014b3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', 296, 'Iterative Postorder (1 Stack)', 'Hard', '', 296)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a4480eb2-b8f0-515a-bded-528727aaed75', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'f1dc89c1-4ae1-58db-a3bd-c05301a7de7b', 297, 'Preorder, Inorder and Postorder in One Traversal', 'Medium', '', 297)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('7d9ca85b-7b51-5a41-89e6-90e00eddb05e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 298, 'Maximum Depth of Binary Tree', 'Easy', '', 298)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c7f5221d-62ef-5d45-bcbe-f15071f7e06b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 299, 'Check for Balanced Binary Tree', 'Easy', '', 299)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('de61fda6-cd6a-535c-ad99-fb41edb86fd4', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 300, 'Diameter of Binary Tree', 'Easy', '', 300)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2705d909-a3f7-5156-913e-b43d105625d8', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 301, 'Maximum Path Sum', 'Hard', '', 301)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('959635b3-38f2-5636-b4f8-67316e0e6e01', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 302, 'Check if Two Trees are Identical', 'Easy', '', 302)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ad2eb4c6-0118-5a9f-9dfa-3bc8debfa8bc', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 303, 'Zig-Zag Traversal', 'Medium', '', 303)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('701b5b05-26f5-51fb-8de2-7aa487a4ee39', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 304, 'Boundary Traversal', 'Medium', '', 304)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('09bdef40-8d18-5569-a336-2f08b3fb2662', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 305, 'Vertical Order Traversal', 'Hard', '', 305)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('57f7fa91-e5ef-503c-9012-929ca22db953', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 306, 'Top View', 'Medium', '', 306)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('19d1b28b-67e6-5716-b8d3-220c109c4794', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 307, 'Bottom View', 'Medium', '', 307)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('454dc77b-d447-5077-a877-adc93eef2afb', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 308, 'Left / Right View', 'Easy', '', 308)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('141f1ae2-4271-578d-9212-1f38e54d7707', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', '45930f37-11d3-5ed2-8278-4a4d926f36a9', 309, 'Symmetric Binary Tree', 'Easy', '', 309)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c21f6e09-d9b6-528a-9672-ccce1f60a0ed', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 310, 'Root-to-Node Path', 'Medium', '', 310)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('dc6bb9ff-1057-5bc2-ad29-2bfb410331a9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 311, 'Lowest Common Ancestor', 'Medium', '', 311)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('3f7746db-e21f-5239-b4ca-32abe7029f25', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 312, 'Maximum Width of Binary Tree', 'Medium', '', 312)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f318328b-9b62-5925-8536-25705ff8606c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 313, 'Children Sum Property', 'Medium', '', 313)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('fd03c707-fe80-53a3-a0e6-b53f64eafa4c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 314, 'Print All Nodes at Distance K', 'Medium', '', 314)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('33fee4ad-9e15-5c47-8439-ea6795d7d860', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 315, 'Minimum Time to Burn the Tree', 'Hard', '', 315)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1680e549-5e64-5e1b-a04b-c41a725c77aa', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 316, 'Count Nodes in a Complete Binary Tree', 'Medium', '', 316)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('410d295c-8d37-5572-955e-705f3c0d8e1c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 317, 'Construct Tree from Preorder and Inorder', 'Medium', '', 317)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('613c3ee1-d48e-5a59-800f-6f3bc695b2df', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 318, 'Construct Tree from Inorder and Postorder', 'Medium', '', 318)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('47a80654-00b0-50c0-b5f8-d99a3a8394b5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 319, 'Serialize and Deserialize Binary Tree', 'Hard', '', 319)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('31a7490c-0d3a-5341-af9f-75e9e5d7d415', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 320, 'Morris Inorder Traversal', 'Medium', '', 320)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('79ddf0e2-bf9e-501f-80eb-395c36705844', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 321, 'Morris Preorder Traversal', 'Medium', '', 321)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0b5bbb64-f1c2-57e1-9789-32e793061932', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '7a7fadf8-cac8-5dbb-bb4e-093e5585ff43', 'd8aba576-cb2e-5dfc-beed-f4f7b26a26a3', 322, 'Flatten Binary Tree to Linked List', 'Medium', '', 322)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1c9baa73-f119-51ac-8f80-d2438ab0f886', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '1d7a03d5-8a36-5c0a-bb23-b342af388e69', 323, 'Introduction to BST', 'Easy', '', 323)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ed3c38b5-2d1e-55d4-8797-907b7a1498b5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '1d7a03d5-8a36-5c0a-bb23-b342af388e69', 324, 'Search in a BST', 'Easy', '', 324)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2a369f7b-39d7-543c-9757-bcf89b67b12e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '1d7a03d5-8a36-5c0a-bb23-b342af388e69', 325, 'Find Min / Max in BST', 'Easy', '', 325)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('256958db-55a6-5215-8056-4d3ab357b600', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '1d7a03d5-8a36-5c0a-bb23-b342af388e69', 326, 'Ceil in BST', 'Medium', '', 326)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f91a2996-800e-55ce-a616-f0bdf775ff79', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '1d7a03d5-8a36-5c0a-bb23-b342af388e69', 327, 'Floor in BST', 'Medium', '', 327)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bb75e2f5-36a1-5fbc-a39a-bf2c4e9e38b5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '1d7a03d5-8a36-5c0a-bb23-b342af388e69', 328, 'Insert a Node in BST', 'Medium', '', 328)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('eb54a10e-46e9-560d-855f-26b288b131ff', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '1d7a03d5-8a36-5c0a-bb23-b342af388e69', 329, 'Delete a Node in BST', 'Medium', '', 329)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('caf00c22-eac5-54e9-80cb-fb02e4735f82', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '1d7a03d5-8a36-5c0a-bb23-b342af388e69', 330, 'Kth Smallest / Largest Element in BST', 'Medium', '', 330)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('564d64a7-5eb8-5cfd-bf8b-76a2487767bc', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '1d7a03d5-8a36-5c0a-bb23-b342af388e69', 331, 'Check if a Tree is BST', 'Medium', '', 331)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('afe8cce9-d175-5a06-9ab0-f57ccedf448b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '1d7a03d5-8a36-5c0a-bb23-b342af388e69', 332, 'LCA in BST', 'Easy', '', 332)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ff1f5c18-f729-5cd8-82e1-c1fe32b0f3d6', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', '1d7a03d5-8a36-5c0a-bb23-b342af388e69', 333, 'Construct BST from Preorder Traversal', 'Medium', '', 333)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f256509d-c49c-572d-a8af-7bc993c916a3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', 'de8fe898-2f71-534f-b640-56815730da00', 334, 'Inorder Successor / Predecessor in BST', 'Medium', '', 334)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('71dd2fea-42ab-5ad2-9fb1-7d6033796bf0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', 'de8fe898-2f71-534f-b640-56815730da00', 335, 'BST Iterator', 'Medium', '', 335)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('17cf9b1c-3c3b-5d5c-90f1-349e41bb3d9b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', 'de8fe898-2f71-534f-b640-56815730da00', 336, 'Two Sum in BST', 'Medium', '', 336)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('7365f4f2-7187-554f-a217-b24d2fac04c9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', 'de8fe898-2f71-534f-b640-56815730da00', 337, 'Recover BST', 'Hard', '', 337)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0c73a51f-6fae-5164-97ca-cc370b9e3f7a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3ad19d2a-8709-58fc-9a03-fb8f6f83238d', 'de8fe898-2f71-534f-b640-56815730da00', 338, 'Largest BST in a Binary Tree', 'Hard', '', 338)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6bb18f58-c773-5ac8-86f5-8d81690f5eda', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'd1e8dc6f-ad9a-5466-a1e4-a953a698868a', 339, 'Introduction to Graphs', 'Easy', '', 339)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('79fd878f-f973-5595-b846-7e2cd9e9853e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'd1e8dc6f-ad9a-5466-a1e4-a953a698868a', 340, 'Graph Representation (Matrix and List)', 'Easy', '', 340)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('80e6b842-5d95-50c8-94bd-d416116a61c4', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'd1e8dc6f-ad9a-5466-a1e4-a953a698868a', 341, 'Connected Components', 'Easy', '', 341)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('dc99cfab-c0fa-54fa-8ee0-eefaf1588635', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'd1e8dc6f-ad9a-5466-a1e4-a953a698868a', 342, 'BFS', 'Easy', '', 342)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ebb0827c-7579-59aa-9693-cd5c3f71fe21', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'd1e8dc6f-ad9a-5466-a1e4-a953a698868a', 343, 'DFS', 'Easy', '', 343)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('455ac7fc-2f54-5221-ac96-0809a46d6dff', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 344, 'Number of Provinces', 'Medium', '', 344)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b0bedab3-c254-5ca2-9433-174420a3ab92', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 345, 'Number of Islands', 'Medium', '', 345)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6c1a3d71-f9d0-5962-96cd-2d02621ccd7e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 346, 'Rotten Oranges', 'Medium', '', 346)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('73b123be-9e2b-5bd0-a8b7-65a56de5b625', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 347, 'Flood Fill', 'Easy', '', 347)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a5ccc955-a7fc-555a-a8d6-29ef5e3346ee', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 348, 'Cycle Detection in Undirected Graph (BFS)', 'Medium', '', 348)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5dde9587-e8b5-5679-a453-cc2a7849202c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 349, 'Cycle Detection in Undirected Graph (DFS)', 'Medium', '', 349)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('caf49996-c638-5f5f-872f-9f994fd55e07', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 350, '0/1 Matrix (Distance of Nearest 1)', 'Medium', '', 350)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5f44ad3c-08d3-5dc8-8957-8eebcc8b747f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 351, 'Surrounded Regions', 'Medium', '', 351)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0826012a-c92e-52d8-9277-37ebfb66003d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 352, 'Number of Enclaves', 'Medium', '', 352)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2200622d-c60a-555b-af38-8f536d6768cc', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 353, 'Word Ladder I', 'Hard', '', 353)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('958e2ef7-bcc8-5a7e-9384-4e1c4bba129f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 354, 'Word Ladder II', 'Hard', '', 354)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('12a7948f-1875-579b-a973-469fc7fb80f3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 355, 'Number of Distinct Islands', 'Medium', '', 355)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e3faf877-860a-54ca-8498-562bf2a266d0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 356, 'Bipartite Graph (BFS)', 'Medium', '', 356)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0ffe9645-3321-5fc4-ae89-9efda6e8d3c7', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 357, 'Bipartite Graph (DFS)', 'Medium', '', 357)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6181be74-ecb5-5cc7-8e88-abfe5c7f0c73', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '16cb10fd-40f5-5288-9c04-3b93c6f53dc7', 358, 'Cycle Detection in Directed Graph (DFS)', 'Medium', '', 358)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6d0c44dd-7b9a-5b85-9993-1693bfa81d99', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'cc30771a-3dea-52e0-9d48-b6b774f69183', 359, 'Topological Sort (DFS)', 'Medium', '', 359)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0225d3fd-4d6a-5222-8134-16d544a731d2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'cc30771a-3dea-52e0-9d48-b6b774f69183', 360, 'Kahn''s Algorithm (BFS)', 'Medium', '', 360)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e574fb77-8b0d-5b4f-bac9-f67c5ea26d0f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'cc30771a-3dea-52e0-9d48-b6b774f69183', 361, 'Cycle Detection in Directed Graph (BFS)', 'Medium', '', 361)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9994d7b7-eabc-5b98-9588-f9d725290868', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'cc30771a-3dea-52e0-9d48-b6b774f69183', 362, 'Course Schedule I', 'Medium', '', 362)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b756075e-5535-5e96-8ff1-137bc36671b5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'cc30771a-3dea-52e0-9d48-b6b774f69183', 363, 'Course Schedule II', 'Medium', '', 363)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0e8500fe-11db-5e3b-b881-ec2f6a81b65e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'cc30771a-3dea-52e0-9d48-b6b774f69183', 364, 'Find Eventual Safe States', 'Medium', '', 364)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b36b18cc-e093-5f91-a195-66e0ff3701c2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'cc30771a-3dea-52e0-9d48-b6b774f69183', 365, 'Alien Dictionary', 'Hard', '', 365)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b3aef75e-894d-545d-bfba-a0996ff9c813', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 366, 'Shortest Path in Undirected Graph with Unit Weights', 'Medium', '', 366)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1a04093a-ddd4-5216-9428-a5c47230c6aa', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 367, 'Shortest Path in DAG', 'Medium', '', 367)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('46e13b9b-8294-52e2-9de5-f1f9a84378c0', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 368, 'Dijkstra''s Algorithm', 'Medium', '', 368)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('876bd091-71d3-50e3-bd8c-1e3e29f00829', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 369, 'Print Shortest Path', 'Medium', '', 369)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1f5a83ba-3f75-5eb2-9e52-9e40fb519db3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 370, 'Shortest Path in a Binary Maze', 'Medium', '', 370)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('03e2f9c2-6519-57e2-b3b0-fca909fe3fe5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 371, 'Path with Minimum Effort', 'Medium', '', 371)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d6fc3104-c4f6-579d-9d3e-b38ee089b2b8', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 372, 'Cheapest Flights Within K Stops', 'Medium', '', 372)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('fa9669ee-a0ce-57fb-91fd-2e2823160bd8', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 373, 'Minimum Multiplications to Reach End', 'Hard', '', 373)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6cd260ae-55b3-5384-b0b0-739000ff438a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 374, 'Number of Ways to Arrive at Destination', 'Medium', '', 374)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c8914be2-07cd-5cf5-9806-83fa66f7bb29', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 375, 'Bellman-Ford Algorithm', 'Medium', '', 375)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('86e1dab0-0ed9-5abd-a003-c24255ed1e3f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 376, 'Floyd-Warshall Algorithm', 'Medium', '', 376)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('197b3bc6-8796-5bb5-be41-c137e23e84bf', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '265b5adc-4274-59d8-86cc-880eeacb1691', 377, 'Find the City with Smallest Number of Neighbours', 'Medium', '', 377)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ea94c65d-dc8e-5723-86c4-e180c5d336d6', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'fa2943b5-b31d-5c19-8ec1-59505737a539', 378, 'Minimum Spanning Tree Theory', 'Medium', '', 378)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('4a0e4a21-f1e6-56be-8652-356d16f29cf7', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'fa2943b5-b31d-5c19-8ec1-59505737a539', 379, 'Prim''s Algorithm', 'Medium', '', 379)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9f839eba-fe2f-5a0a-9599-27fec1679b9f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'fa2943b5-b31d-5c19-8ec1-59505737a539', 380, 'Disjoint Set (Union by Rank / Size, Path Compression)', 'Medium', '', 380)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6fd549f2-75dd-50d6-b68a-99aa0d9abf3f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'fa2943b5-b31d-5c19-8ec1-59505737a539', 381, 'Kruskal''s Algorithm', 'Medium', '', 381)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a0d12f6e-334d-5990-8de0-17b15b04b28d', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'fa2943b5-b31d-5c19-8ec1-59505737a539', 382, 'Number of Provinces (DSU)', 'Medium', '', 382)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('8b09a164-7cdc-5ad6-8ea5-e4588bb0b92c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'fa2943b5-b31d-5c19-8ec1-59505737a539', 383, 'Number of Operations to Make Network Connected', 'Medium', '', 383)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c57cb7fe-b27a-5e1b-9f2b-2af6d708e9bd', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'fa2943b5-b31d-5c19-8ec1-59505737a539', 384, 'Accounts Merge', 'Medium', '', 384)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('27103e48-792c-5cf9-a478-cc6da7997b66', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'fa2943b5-b31d-5c19-8ec1-59505737a539', 385, 'Number of Islands II', 'Hard', '', 385)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f33f9214-9809-5ba1-b39b-3c41f60fb9d2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'fa2943b5-b31d-5c19-8ec1-59505737a539', 386, 'Making a Large Island', 'Hard', '', 386)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('cd28b92f-53b4-5cd7-902d-05b5bfd2e64b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', 'fa2943b5-b31d-5c19-8ec1-59505737a539', 387, 'Most Stones Removed', 'Medium', '', 387)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('01e60a83-e94a-5f1d-9a82-47d4912d1b4a', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '21e2c514-d3dc-5de4-ac64-03fc5f013858', 388, 'Bridges in Graph', 'Hard', '', 388)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2b122e8f-093a-5e98-a42b-ac5df032aa87', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '21e2c514-d3dc-5de4-ac64-03fc5f013858', 389, 'Articulation Points', 'Hard', '', 389)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('cab5aa46-1573-5f9d-8dcf-e55c7b1f222e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '91bac199-9026-5454-aa1a-772f8496db08', '21e2c514-d3dc-5de4-ac64-03fc5f013858', 390, 'Kosaraju''s Algorithm (Strongly Connected Components)', 'Hard', '', 390)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1a34bea6-5f5e-57ca-af6b-e71087aa6238', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '71015143-0d8b-595e-a4df-c83e2c80d6f3', 391, 'Memoization', 'Easy', '', 391)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f5125132-f78f-583f-9c76-02e16087fa93', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '71015143-0d8b-595e-a4df-c83e2c80d6f3', 392, 'Tabulation', 'Easy', '', 392)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bf641ae0-cdef-50d1-83a2-28cb4f6b397b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '71015143-0d8b-595e-a4df-c83e2c80d6f3', 393, 'Space Optimization (via Fibonacci)', 'Easy', '', 393)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('99bb4353-202d-5243-81ca-e56f2f1ab6d5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '396cb164-d1b9-595c-96cf-c92858181fab', 394, 'Climbing Stairs', 'Easy', '', 394)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('124086d2-22fc-5d21-82e6-27f0cecab588', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '396cb164-d1b9-595c-96cf-c92858181fab', 395, 'Frog Jump', 'Medium', '', 395)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bed2d747-6904-5d34-aa34-76a291fbecd2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '396cb164-d1b9-595c-96cf-c92858181fab', 396, 'Frog Jump with K Distances', 'Medium', '', 396)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5409c583-2766-5af9-a205-d7152cb84808', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '396cb164-d1b9-595c-96cf-c92858181fab', 397, 'Maximum Sum of Non-Adjacent Elements', 'Medium', '', 397)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('30881ee0-fdd9-5ad7-bc1d-9818528e2376', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '396cb164-d1b9-595c-96cf-c92858181fab', 398, 'House Robber II', 'Medium', '', 398)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('859756a0-f015-5efb-b326-1851cdc23afa', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '396cb164-d1b9-595c-96cf-c92858181fab', 399, 'Ninja''s Training', 'Medium', '', 399)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d15b4cc1-80ed-5643-bc27-c1792cf39b88', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f781cb8e-e54a-5ec7-a506-f8b90b7d8f61', 400, 'Grid Unique Paths I', 'Medium', '', 400)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('65d21cf8-d99e-51d3-9fe5-dc49a08939f2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f781cb8e-e54a-5ec7-a506-f8b90b7d8f61', 401, 'Grid Unique Paths II', 'Medium', '', 401)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('34e2ab9c-db83-539d-8d29-8e8c670949f4', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f781cb8e-e54a-5ec7-a506-f8b90b7d8f61', 402, 'Minimum Path Sum in Grid', 'Medium', '', 402)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d3279354-c291-5fc8-a972-b0f89d6a68bd', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f781cb8e-e54a-5ec7-a506-f8b90b7d8f61', 403, 'Triangle (Minimum Path Sum)', 'Medium', '', 403)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('63585409-066d-58da-8845-2fbbf0eb481f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f781cb8e-e54a-5ec7-a506-f8b90b7d8f61', 404, 'Minimum / Maximum Falling Path Sum', 'Medium', '', 404)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2ccd539f-ba6b-5467-8cfd-65dae8e17e73', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f781cb8e-e54a-5ec7-a506-f8b90b7d8f61', 405, 'Cherry Pickup I', 'Hard', '', 405)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('518329e6-9815-5e6f-b988-971bdffa1fd5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f781cb8e-e54a-5ec7-a506-f8b90b7d8f61', 406, 'Cherry Pickup II', 'Hard', '', 406)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('5082e49d-2528-5ceb-a2aa-30e42e8e52a5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '23599c08-d75d-5da3-954e-73739d53d8d8', 407, 'Subset Sum Equals Target', 'Medium', '', 407)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('263c86b4-08fa-5970-a0ca-d8dc1ec04467', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '23599c08-d75d-5da3-954e-73739d53d8d8', 408, 'Partition Equal Subset Sum', 'Medium', '', 408)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d6cb3fa6-b8a5-5c1a-a0f3-14afa3c2a1cb', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '23599c08-d75d-5da3-954e-73739d53d8d8', 409, 'Partition with Minimum Absolute Difference', 'Hard', '', 409)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('37e89540-c286-5dc8-826b-755f034d2960', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '23599c08-d75d-5da3-954e-73739d53d8d8', 410, 'Count Subsets with Sum K', 'Medium', '', 410)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c79e6bc7-6c66-5f10-a528-943242fe2b8c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '23599c08-d75d-5da3-954e-73739d53d8d8', 411, 'Count Partitions with Given Difference', 'Medium', '', 411)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('067c9e06-9664-5b0a-a9e3-aa899586be19', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '23599c08-d75d-5da3-954e-73739d53d8d8', 412, '0/1 Knapsack', 'Medium', '', 412)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('4322f9a9-dbf7-5030-8094-f014e7d98dbc', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '23599c08-d75d-5da3-954e-73739d53d8d8', 413, 'Minimum Coins', 'Medium', '', 413)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('fb1a358a-ef4e-516e-96b6-227ac9e2e631', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '23599c08-d75d-5da3-954e-73739d53d8d8', 414, 'Target Sum', 'Medium', '', 414)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ca568d55-ded1-50bf-ba12-982c1932084b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '23599c08-d75d-5da3-954e-73739d53d8d8', 415, 'Coin Change II', 'Medium', '', 415)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e03adb80-c3fa-532a-847b-87933dd68845', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '23599c08-d75d-5da3-954e-73739d53d8d8', 416, 'Unbounded Knapsack', 'Medium', '', 416)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('09037a7d-fa29-595c-b53f-3c53668ebda3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '23599c08-d75d-5da3-954e-73739d53d8d8', 417, 'Rod Cutting', 'Medium', '', 417)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('1c40d1a5-f635-5a17-85b0-677e81557306', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f25a32f6-54d4-5a19-b6a3-2a903a8c535d', 418, 'Longest Common Subsequence', 'Medium', '', 418)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('374b000c-a2d2-52a2-a46e-0fcf70306786', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f25a32f6-54d4-5a19-b6a3-2a903a8c535d', 419, 'Print Longest Common Subsequence', 'Medium', '', 419)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('3cfa6337-6eb7-5678-8ce3-11fcec34ddd1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f25a32f6-54d4-5a19-b6a3-2a903a8c535d', 420, 'Longest Common Substring', 'Medium', '', 420)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('04a385bd-2b51-59c8-9dba-c6a048b104b9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f25a32f6-54d4-5a19-b6a3-2a903a8c535d', 421, 'Longest Palindromic Subsequence', 'Medium', '', 421)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9af4d73e-128f-5b9f-94b2-a2f939f6cf58', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f25a32f6-54d4-5a19-b6a3-2a903a8c535d', 422, 'Minimum Insertions to Make String Palindrome', 'Medium', '', 422)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6e4e3c93-65b7-54d6-b018-c8526ff68c64', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f25a32f6-54d4-5a19-b6a3-2a903a8c535d', 423, 'Minimum Insertions / Deletions to Convert A to B', 'Medium', '', 423)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('8b57f90e-b536-546e-8274-3ac6cfcb7f76', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f25a32f6-54d4-5a19-b6a3-2a903a8c535d', 424, 'Shortest Common Supersequence', 'Hard', '', 424)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('c1df6008-eb81-547f-b0a1-1e9d87b8cc3c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f25a32f6-54d4-5a19-b6a3-2a903a8c535d', 425, 'Distinct Subsequences', 'Hard', '', 425)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('f37ac749-1a9a-5c4a-96fb-3519b4202378', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f25a32f6-54d4-5a19-b6a3-2a903a8c535d', 426, 'Edit Distance', 'Hard', '', 426)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('166cbb1f-8e2f-5493-9244-4262b30f759b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f25a32f6-54d4-5a19-b6a3-2a903a8c535d', 427, 'Wildcard Matching', 'Hard', '', 427)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b615d502-131f-523f-a3ed-078d57c445f3', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '4db5ea2e-dbec-53f8-99a1-3b4115f3b417', 428, 'Buy and Sell Stock I', 'Easy', '', 428)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('a04cb7e4-8725-5c69-a738-cb3dd193ea14', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '4db5ea2e-dbec-53f8-99a1-3b4115f3b417', 429, 'Buy and Sell Stock II', 'Medium', '', 429)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b2e17f5e-be2f-556e-a94c-bad1e9f3e44b', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '4db5ea2e-dbec-53f8-99a1-3b4115f3b417', 430, 'Buy and Sell Stock III', 'Hard', '', 430)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('6110c6e3-aa46-5d15-91aa-6ae86c4bb988', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '4db5ea2e-dbec-53f8-99a1-3b4115f3b417', 431, 'Buy and Sell Stock IV', 'Hard', '', 431)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('0b83f751-e4fb-5414-8813-1458b33c3092', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '4db5ea2e-dbec-53f8-99a1-3b4115f3b417', 432, 'Buy and Sell Stock with Cooldown', 'Medium', '', 432)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ebceb7a7-45bb-5d87-a118-073fc810f065', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '4db5ea2e-dbec-53f8-99a1-3b4115f3b417', 433, 'Buy and Sell Stock with Transaction Fee', 'Medium', '', 433)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bec6e6ba-2e92-5a66-bf84-1d187477e12e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '856797d1-e9bb-51df-b285-4dac7549a76e', 434, 'Longest Increasing Subsequence', 'Medium', '', 434)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('14a9c521-4dcc-5263-b76f-fbf7d328cd81', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '856797d1-e9bb-51df-b285-4dac7549a76e', 435, 'Print Longest Increasing Subsequence', 'Medium', '', 435)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('910a4936-7ff2-596f-a137-622148fcb285', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '856797d1-e9bb-51df-b285-4dac7549a76e', 436, 'LIS Using Binary Search', 'Medium', '', 436)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('20a73500-a4a0-5094-86d0-40ccc85b7759', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '856797d1-e9bb-51df-b285-4dac7549a76e', 437, 'Largest Divisible Subset', 'Medium', '', 437)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('24688b7c-a2a2-555e-81db-72cea48bbf38', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '856797d1-e9bb-51df-b285-4dac7549a76e', 438, 'Longest String Chain', 'Medium', '', 438)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('d3232b5b-c798-516d-9432-b15d27861758', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '856797d1-e9bb-51df-b285-4dac7549a76e', 439, 'Longest Bitonic Subsequence', 'Medium', '', 439)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('7f20b6c8-de0a-5b7c-a746-c2deae233b5e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '856797d1-e9bb-51df-b285-4dac7549a76e', 440, 'Number of Longest Increasing Subsequences', 'Medium', '', 440)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('660b8c1b-d665-5c0e-9b40-e5a8ffa0a09c', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '519c28dd-4588-5f07-bbf9-de4fbc3984b1', 441, 'Matrix Chain Multiplication (Memoization)', 'Hard', '', 441)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e1d3a966-09a1-5e10-b864-19575b48931f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '519c28dd-4588-5f07-bbf9-de4fbc3984b1', 442, 'Matrix Chain Multiplication (Tabulation)', 'Hard', '', 442)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('bb708365-b196-5d53-9d1c-0613634ab0fe', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '519c28dd-4588-5f07-bbf9-de4fbc3984b1', 443, 'Minimum Cost to Cut a Stick', 'Hard', '', 443)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9ad27742-ed67-50cf-9aa4-bc6bb25095d2', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '519c28dd-4588-5f07-bbf9-de4fbc3984b1', 444, 'Burst Balloons', 'Hard', '', 444)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('38d309db-d5ab-5e36-a314-b6af7c42b18e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '519c28dd-4588-5f07-bbf9-de4fbc3984b1', 445, 'Evaluate Boolean Expression to True', 'Hard', '', 445)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('b44b089b-c9b4-55ff-9585-32ed652853e5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '519c28dd-4588-5f07-bbf9-de4fbc3984b1', 446, 'Palindrome Partitioning II', 'Hard', '', 446)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ec3ce281-2756-5787-8253-4d3eccbf5873', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', '519c28dd-4588-5f07-bbf9-de4fbc3984b1', 447, 'Partition Array for Maximum Sum', 'Medium', '', 447)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('8ffc3f71-dfa2-5b46-98c1-338b472d13b8', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f81615b9-868b-541d-8554-d194cf386579', 448, 'Maximum Rectangle Area with All 1s', 'Hard', '', 448)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('2b9b3cb3-07c7-51ba-909e-9869cc0c0049', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '29314c4f-35a8-5895-9381-f342b6fa0ec1', 'f81615b9-868b-541d-8554-d194cf386579', 449, 'Count Square Submatrices with All 1s', 'Medium', '', 449)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('648c07c4-1b5f-5521-8168-98b562822bd4', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '87fda366-9511-59cd-a1f0-a1de02d7cfe6', '3be2687c-c34c-580b-89b2-1d2566c54434', 450, 'Implement Trie I (Insert, Search, StartsWith)', 'Medium', '', 450)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('fcdc922b-ea0c-5f4d-9c55-3be0ded52869', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '87fda366-9511-59cd-a1f0-a1de02d7cfe6', '3be2687c-c34c-580b-89b2-1d2566c54434', 451, 'Implement Trie II (Prefix Count, Word Count, Erase)', 'Medium', '', 451)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e81f1280-62c4-5ad9-bf05-360822b2f7c9', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '87fda366-9511-59cd-a1f0-a1de02d7cfe6', '1e7892b6-4a82-5a97-8994-0f06683da3ba', 452, 'Longest String with All Prefixes', 'Medium', '', 452)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('50ce96bd-70b4-58b6-b139-55d9e8dffcdc', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '87fda366-9511-59cd-a1f0-a1de02d7cfe6', '1e7892b6-4a82-5a97-8994-0f06683da3ba', 453, 'Number of Distinct Substrings in a String', 'Medium', '', 453)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('feeef7ec-39df-5c25-ab30-2a3ecd35c5b8', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '87fda366-9511-59cd-a1f0-a1de02d7cfe6', '1e7892b6-4a82-5a97-8994-0f06683da3ba', 454, 'Bit Prerequisites for Trie Problems', 'Medium', '', 454)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('fc9b2ca2-8394-5350-92de-2ae95240bcc1', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '87fda366-9511-59cd-a1f0-a1de02d7cfe6', '1e7892b6-4a82-5a97-8994-0f06683da3ba', 455, 'Maximum XOR of Two Numbers in an Array', 'Medium', '', 455)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('cf1a152a-90f7-5b2f-9b9c-c905a3b64a4f', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '87fda366-9511-59cd-a1f0-a1de02d7cfe6', '1e7892b6-4a82-5a97-8994-0f06683da3ba', 456, 'Maximum XOR with an Element from Array', 'Hard', '', 456)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('e6841bff-662b-5c90-9e9c-28c70d947eca', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3a04d9ed-206a-584f-b489-7bea493146d1', 'fc7619f4-4d95-5eaf-baa0-83fd6c4f70df', 457, 'Minimum Characters to Add at Front to Make String Palindrome', 'Hard', '', 457)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('aed28663-ab2d-5229-96e9-d1d2d749fcdc', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3a04d9ed-206a-584f-b489-7bea493146d1', 'fc7619f4-4d95-5eaf-baa0-83fd6c4f70df', 458, 'Rabin-Karp Algorithm', 'Medium', '', 458)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('ccc6d61b-ff13-5977-a4ae-66def8957305', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3a04d9ed-206a-584f-b489-7bea493146d1', 'fc7619f4-4d95-5eaf-baa0-83fd6c4f70df', 459, 'Z-Function', 'Hard', '', 459)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('9595ee93-8ccd-590b-9fe7-a355ce25653e', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3a04d9ed-206a-584f-b489-7bea493146d1', 'fc7619f4-4d95-5eaf-baa0-83fd6c4f70df', 460, 'KMP Algorithm / LPS Array', 'Hard', '', 460)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('11be4435-4f92-5af9-a4bc-632d1e4386a5', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3a04d9ed-206a-584f-b489-7bea493146d1', 'fc7619f4-4d95-5eaf-baa0-83fd6c4f70df', 461, 'Shortest Palindrome', 'Hard', '', 461)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('3b1f10d6-47e1-5498-8c54-6f69879ed318', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3a04d9ed-206a-584f-b489-7bea493146d1', 'fc7619f4-4d95-5eaf-baa0-83fd6c4f70df', 462, 'Longest Happy Prefix', 'Hard', '', 462)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)
VALUES ('18475826-419f-5a63-8933-c954fe7ae297', 'ec02cce2-0ddd-536a-b329-9e51f496e2cd', '3a04d9ed-206a-584f-b489-7bea493146d1', 'fc7619f4-4d95-5eaf-baa0-83fd6c4f70df', 463, 'Count and Say', 'Medium', '', 463)
ON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;
