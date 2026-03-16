# TASK_BACKLOG.md - Complete 64 Task Breakdown

## Overview

All 64 atomic tasks from Phase 1-8 organized by phase with time estimates, acceptance criteria, and dependencies.

---

## PHASE 1: Foundation & Auth (8 Tasks)

### [1-A-1] Create Flutter project structure
- **Time**: 1 day
- **Depends On**: None
- **Task**: Initialize Flutter project with Clean Architecture folders
- **Acceptance Criteria**:
  - [ ] `lib/` folder has: domain/, data/, presentation/, core/
  - [ ] pubspec.yaml contains all required dependencies
  - [ ] `flutter pub get` completes without errors
  - [ ] `flutter analyze` shows 0 errors
- **Subtasks**:
  - Create folder structure
  - Add pubspec.yaml dependencies (60+ packages)
  - Set up build.yaml for code generation

### [1-A-2] Configure Freezed code generation
- **Time**: 4 hours
- **Depends On**: [1-A-1]
- **Task**: Set up Freezed, JSON serialization, and build runner
- **Acceptance Criteria**:
  - [ ] `flutter pub run build_runner build` succeeds
  - [ ] .freezed.dart and .g.dart files generate correctly
  - [ ] No duplicate definitions errors

### [1-B-1] Design authentication schema
- **Time**: 1 day
- **Depends On**: None
- **Task**: Define JWT token strategy, refresh mechanism, session management
- **Acceptance Criteria**:
  - [ ] JWT structure documented (header.payload.signature)
  - [ ] Refresh token flow defined
  - [ ] Session expiration policy (15 min access, 7 day refresh)
  - [ ] Token storage strategy (secure storage + Hive)

### [1-B-2] Implement JWT storage (Hive)
- **Time**: 1 day
- **Depends On**: [1-A-1], [1-B-1]
- **Task**: Create Hive storage for tokens and user preferences
- **Acceptance Criteria**:
  - [ ] Tokens saved to secure Hive box
  - [ ] Tokens retrieved without errors
  - [ ] Old tokens cleared on logout
  - [ ] Hive box encrypted (use hive_flutter)

### [1-B-3] Implement token refresh mechanism
- **Time**: 2 days
- **Depends On**: [1-B-2]
- **Task**: Automatic refresh on 401 response
- **Acceptance Criteria**:
  - [ ] Dio interceptor detects 401 response
  - [ ] POST /auth/refresh called automatically
  - [ ] New token stored to Hive
  - [ ] Original request retried with new token
  - [ ] No infinite refresh loops

### [1-C-1] Build login screen UI
- **Time**: 2 days
- **Depends On**: [1-A-1]
- **Task**: Create login form with validation
- **Acceptance Criteria**:
  - [ ] Email input field with keyboard
  - [ ] Password input field (masked)
  - [ ] Login button (disabled when form invalid)
  - [ ] Remember me checkbox
  - [ ] Responsive for mobile + tablet
  - [ ] Test on 4" phone & 10" tablet

### [1-C-2] Implement login form validation
- **Time**: 1 day
- **Depends On**: [1-C-1]
- **Task**: Real-time field validation
- **Acceptance Criteria**:
  - [ ] Email format validation
  - [ ] Password minimum 6 characters
  - [ ] Submit button disabled until valid
  - [ ] Error messages show in red below fields

### [1-D-1] Create auth API client (Dio)
- **Time**: 2 days
- **Depends On**: [1-B-2], [1-A-1]
- **Task**: Remote datasource for auth endpoints
- **Acceptance Criteria**:
  - [ ] POST /auth/login implemented
  - [ ] POST /auth/refresh implemented
  - [ ] POST /auth/logout implemented
  - [ ] Token extracted from response
  - [ ] Dio error interceptor handles 401/403

---

## PHASE 2: Projects Core (12 Tasks)

### [2-A-1] Create Project Freezed entity
- **Time**: 4 hours
- **Depends On**: [1-A-1]
- **Acceptance Criteria**:
  - [ ] Project class generated with copyWith()
  - [ ] fromJson/toJson work correctly
  - [ ] ProjectType enum: residential, commercial, industrial
  - [ ] ProjectStatus enum: pending, in_progress, completed

### [2-B-1] Implement GET /projects endpoint
- **Time**: 1 day
- **Depends On**: [1-A-1]
- **Acceptance Criteria**:
  - [ ] Fetches 5+ projects with pagination
  - [ ] Query params work: search, type, status, page, limit
  - [ ] Response parsed to ProjectModel list
  - [ ] Handles network errors gracefully

### [2-B-2] Implement POST /projects (create)
- **Time**: 1 day
- **Depends On**: [2-B-1]
- **Acceptance Criteria**:
  - [ ] Sends project data to backend
  - [ ] Returns 201 with new project
  - [ ] Handles validation errors (400)
  - [ ] Shows error message to user

### [2-B-3] Implement PUT /projects/:id (update)
- **Time**: 1 day
- **Depends On**: [2-B-1]
- **Acceptance Criteria**:
  - [ ] Updates existing project
  - [ ] Returns 200 with updated project
  - [ ] Handles 404 (not found)

### [2-B-4] Implement DELETE /projects/:id
- **Time**: 1 day
- **Depends On**: [2-B-1]
- **Acceptance Criteria**:
  - [ ] Deletes project by ID
  - [ ] Returns 204 No Content
  - [ ] Shows error if already deleted

### [2-C-1] Set up Drift Projects table
- **Time**: 1 day
- **Depends On**: [1-A-1]
- **Acceptance Criteria**:
  - [ ] Projects table schema matches entity
  - [ ] Indexes on status and type
  - [ ] Insert, update, delete operations work
  - [ ] Queries return ProjectModel correctly

### [2-D-1] Create ProjectRepository implementation
- **Time**: 1 day
- **Depends On**: [2-B-all], [2-C-1]
- **Acceptance Criteria**:
  - [ ] getAllProjects() caches to Drift
  - [ ] getProjectById() returns from cache if available
  - [ ] Falls back to cache on network error
  - [ ] All 6 use cases have implementations

### [2-E-1] Implement 6 Project use cases
- **Time**: 2 days
- **Depends On**: [2-D-1]
- **Acceptance Criteria**:
  - [ ] GetAllProjectsUsecase
  - [ ] GetProjectByIdUsecase
  - [ ] SearchProjectsUsecase
  - [ ] CreateProjectUsecase (returns Either)
  - [ ] UpdateProjectUsecase (returns Either)
  - [ ] DeleteProjectUsecase (returns Either)

### [2-F-1] Create Riverpod project providers
- **Time**: 1 day
- **Depends On**: [2-E-1]
- **Acceptance Criteria**:
  - [ ] projectsProvider (FutureProvider)
  - [ ] projectDetailProvider (FamilyFutureProvider)
  - [ ] projectSearchProvider (StateProvider)
  - [ ] projectFilterProvider (StateProvider)

### [2-G-1] Build projects list screen
- **Time**: 3 days
- **Depends On**: [2-F-1]
- **Acceptance Criteria**:
  - [ ] Displays project cards (name, location, status)
  - [ ] Pull-to-refresh works
  - [ ] Pagination: "Load more" button loads next page
  - [ ] Tap card navigates to detail screen
  - [ ] Tap + button opens create modal

### [2-H-1] Build project detail screen
- **Time**: 2 days
- **Depends On**: [2-G-1]
- **Acceptance Criteria**:
  - [ ] Shows 4 tabs: Overview, Timeline, Team, History
  - [ ] Overview tab shows all project fields
  - [ ] Edit button opens edit form
  - [ ] Delete button shows confirmation
  - [ ] Navigation back works

### [2-I-1] Build create/edit project form
- **Time**: 2 days
- **Depends On**: [2-H-1]
- **Acceptance Criteria**:
  - [ ] Form fields: name, type, status, location, budget, dates, description
  - [ ] All fields required except description
  - [ ] Date pickers for start/end
  - [ ] Dropdowns for type/status
  - [ ] Save validates form then calls API
  - [ ] Success shows snackbar + navigates back

---

## PHASE 3: Data Persistence (6 Tasks)

### [3-A-1] Create complete Drift schema
- **Time**: 2 days
- **Depends On**: [2-C-1]
- **Acceptance Criteria**:
  - [ ] 9 tables created (Projects, Tasks, Maintenance, QC, Users, Teams, TeamMembers, QCInstances, Sync)
  - [ ] All primary keys defined
  - [ ] Foreign keys set up
  - [ ] All indexes created
  - [ ] `flutter run` creates database without errors

### [3-B-1] Implement Hive preferences storage
- **Time**: 1 day
- **Depends On**: [1-A-1]
- **Acceptance Criteria**:
  - [ ] Hive box stores: language, theme, notifications, last_sync
  - [ ] Encrypted storage for sensitive data
  - [ ] Get/set methods functional
  - [ ] Data persists across app restarts

### [3-C-1] Implement offline-first caching
- **Time**: 2 days
- **Depends On**: [3-A-1]
- **Acceptance Criteria**:
  - [ ] Network call made first
  - [ ] Results cached to Drift
  - [ ] If network fails, return cached data
  - [ ] Stale data marked (timestamp + 24h TTL)
  - [ ] UI shows "Cached" indicator if stale

### [3-D-1] Build sync queue system
- **Time**: 2 days
- **Depends On**: [3-C-1]
- **Acceptance Criteria**:
  - [ ] Mutations (POST, PUT, DELETE) queued when offline
  - [ ] Queue persisted to Drift
  - [ ] On network reconnect, process queue
  - [ ] Retry failed items up to 3 times
  - [ ] Show notification when sync completes

### [3-E-1] Migrate hardcoded data to Drift
- **Time**: 1 day
- **Depends On**: [3-A-1]
- **Acceptance Criteria**:
  - [ ] Seeder script populates 5 projects
  - [ ] Seeder populates 4 tasks
  - [ ] Seeder populates team data
  - [ ] Data loads on first app launch
  - [ ] Seeder only runs once (check version)

### [3-F-1] Test data persistence layer
- **Time**: 1 day
- **Depends On**: [3-E-1]
- **Acceptance Criteria**:
  - [ ] 10+ unit tests for repository
  - [ ] 5+ integration tests for Drift
  - [ ] Offline mode works without crashes
  - [ ] Data survives app restart
  - [ ] Sync queue processes correctly

---

## PHASE 4: Tasks & Maintenance (11 Tasks)

[Detailed tasks for Task entity (6 tasks) and Maintenance entity (5 tasks)]

**Similar structure to Phase 2 projects (models, datasources, repository, usecases, providers, screens, forms, tests)**

---

## PHASE 5: Quality & Analytics (9 Tasks)

[Detailed tasks for QC Checklist and Analytics screens]

**Includes**: Entity creation, API integration, UI screens, chart implementation, history tracking

---

## PHASE 6: Maps (5 Tasks)

**[6-A-1]** Configure Google Maps API
**[6-A-2]** Add google_maps_flutter package
**[6-B-1]** Build map display with markers
**[6-C-1]** Implement tap handlers
**[6-E-1]** Add marker clustering (if 10+ projects)

---

## PHASE 7: Backend Integration (8 Tasks)

**[7-A-1]** Finalize API contract with backend team
**[7-B-1]** Implement all remote datasources
**[7-C-1]** Error handling interceptor
**[7-D-1]** Request/response logging
**[7-E-1]** Switch from mock to real API
**[7-F-1]** Integration testing with real API
**[7-G-1]** Data migration (if needed)
**[7-H-1]** Document API integration guide

---

## PHASE 8: Testing & Polish (10 Tasks)

**[8-A-1]** Entity unit tests (80%+ coverage)
**[8-A-2]** Use case unit tests
**[8-A-3]** Repository unit tests
**[8-B-1]** Widget tests for all screens
**[8-B-2]** Widget tests for reusable components
**[8-C-1]** Integration test (full user flows)
**[8-D-1]** Bug fixes from testing
**[8-E-1]** UX polish (animations, states)
**[8-F-1]** Accessibility audit
**[8-G-1]** Performance testing & optimization

---

## Task Status Template

```
### [PHASE-ID] Task Title
- **Time**: X days
- **Status**: 🔴 Not Started | 🟡 In Progress | 🟢 Completed
- **Assigned**: Developer name
- **Depends On**: [Other tasks]
- **Completion %**: 0%
- **Notes**: Any blockers or findings
```

---

## Quick Reference: Task IDs by Phase

| Phase | Task Count | IDs | Status |
|-------|------------|-----|--------|
| Phase 1 | 8 | 1-A through 1-H | 🔴 TODO |
| Phase 2 | 12 | 2-A through 2-J | 🔴 TODO |
| Phase 3 | 6 | 3-A through 3-F | 🔴 TODO |
| Phase 4 | 11 | 4-A through 4-K | 🔴 TODO |
| Phase 5 | 9 | 5-A through 5-I | 🔴 TODO |
| Phase 6 | 5 | 6-A through 6-F | 🔴 TODO |
| Phase 7 | 8 | 7-A through 7-H | 🔴 TODO |
| Phase 8 | 10 | 8-A through 8-J | 🔴 TODO |
| **TOTAL** | **64** | | |

---
