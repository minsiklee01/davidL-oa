INSERT INTO runs (title, created_at, status)
VALUES ('New Client Implementation', '2025-11-19T10:00:00Z', 'in_progress');

INSERT INTO steps (run_id, title, description, status)
VALUES
(1, 'Initial Discovery Call',
   'Meet with the client to understand goals, constraints, and success metrics.',
   'assigned'),
(1, 'Configure Internal Tools',
   'Set up internal tools and permissions needed to support this client.',
   'pending'),
(1, 'Build Pilot Workflow',
   'Create a small pilot workflow that demonstrates the value of automation.',
   'pending');