# ARCHITECTURE.md - Flutter App Architecture & Design Patterns

## Overview

This document defines the recommended Flutter architecture for ArchitectHub, emphasizing scalability, testability, and maintainability. Architecture follows **Clean Architecture** with 6 distinct layers.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│ PRESENTATION LAYER (Screens, Widgets, UI)      │
│ - Riverpod StateNotifier
│ - Material 3 components
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│ APPLICATION LAYER (Use Cases, Business Logic)   │
│ - Riverpod service providers
│ - Use case classes with dependency injection
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│ DOMAIN LAYER (Entities, Interfaces)             │
│ - Project, Task, Maintenance, QCItem entities
│ - Repository and UseCase interfaces
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│ DATA LAYER (Implementation, Local & Remote)     │
│ - Repository implementations
│ - Dio (HTTP), Drift (database), Hive (cache)
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│ CORE LAYER (Common utilities, constants)        │
│ - Network exceptions
│ - Logger, constants, extensions
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│ EXTERNAL LAYER (Third-party packages)           │
│ - Dio, Drift, Hive, GoRouter, Riverpod, Freezed
└─────────────────────────────────────────────────┘
```

---

## Folder Structure

```
lib/
├── main.dart                          # App entry point
├── core/                              # Core utilities
│   ├── exceptions/
│   │   ├── network_exception.dart
│   │   └── app_exception.dart
│   ├── constants/
│   │   ├── app_colors.dart
│   │   ├── app_strings.dart
│   │   └── app_dimensions.dart
│   ├── theme/
│   │   ├── app_theme.dart
│   │   └── design_tokens.dart
│   ├── logger/
│   │   └── app_logger.dart
│   ├── extensions/
│   │   ├── string_extensions.dart
│   │   ├── date_extensions.dart
│   │   └── context_extensions.dart
│   └── network/
│       ├── dio_client.dart
│       └── network_info.dart
│
├── data/                              # Data layer (repos, models, datasources)
│   ├── models/                        # JSON-serializable models
│   │   ├── project_model.dart
│   │   ├── task_model.dart
│   │   ├── maintenance_model.dart
│   │   └── qc_item_model.dart
│   ├── datasources/
│   │   ├── local/                     # Local storage
│   │   │   ├── project_local_datasource.dart
│   │   │   ├── task_local_datasource.dart
│   │   │   └── app_database.dart      # Drift database
│   │   └── remote/                    # API calls
│   │       ├── project_remote_datasource.dart
│   │       └── task_remote_datasource.dart
│   └── repositories/                  # Repository implementations
│       ├── project_repository_impl.dart
│       ├── task_repository_impl.dart
│       └── maintenance_repository_impl.dart
│
├── domain/                            # Domain layer (entities, interfaces)
│   ├── entities/
│   │   ├── project.dart               # Project entity (Freezed)
│   │   ├── task.dart                  # Task entity (Freezed)
│   │   ├── maintenance.dart
│   │   ├── user.dart
│   │   └── qc_item.dart
│   ├── repositories/                  # Repository interfaces
│   │   ├── project_repository.dart
│   │   ├── task_repository.dart
│   │   └── maintenance_repository.dart
│   └── usecases/                      # Use case classes
│       ├── project/
│       │   ├── get_all_projects_usecase.dart
│       │   ├── create_project_usecase.dart
│       │   ├── update_project_usecase.dart
│       │   └── delete_project_usecase.dart
│       ├── task/
│       │   ├── get_all_tasks_usecase.dart
│       │   ├── create_task_usecase.dart
│       │   └── complete_task_usecase.dart
│       └── maintenance/
│           └── ...
│
├── presentation/                      # UI layer
│   ├── providers/                     # Riverpod state management
│   │   ├── project_providers.dart     # All project-related providers
│   │   ├── task_providers.dart
│   │   ├── maintenance_providers.dart
│   │   ├── auth_provider.dart
│   │   └── app_providers.dart         # App-wide providers
│   │
│   ├── screens/                       # Full screens/pages
│   │   ├── dashboard/
│   │   │   ├── dashboard_screen.dart
│   │   │   └── dashboard_viewmodel.dart (optional)
│   │   ├── projects/
│   │   │   ├── projects_list_screen.dart
│   │   │   ├── project_detail_screen.dart
│   │   │   └── add_project_screen.dart
│   │   ├── tasks/
│   │   │   ├── tasks_list_screen.dart
│   │   │   └── task_detail_screen.dart
│   │   ├── maintenance/
│   │   │   └── maintenance_list_screen.dart
│   │   ├── quality/
│   │   │   └── quality_checklist_screen.dart
│   │   ├── map/
│   │   │   └── map_screen.dart
│   │   ├── security/
│   │   │   └── security_screen.dart
│   │   ├── profile/
│   │   │   └── profile_screen.dart
│   │   └── analytics/
│   │       └── analytics_screen.dart
│   │
│   ├── widgets/                       # Reusable components
│   │   ├── common/
│   │   │   ├── app_button.dart
│   │   │   ├── app_card.dart
│   │   │   ├── app_badge.dart
│   │   │   ├── custom_appbar.dart
│   │   │   ├── empty_state.dart
│   │   │   └── loading_state.dart
│   │   ├── project/
│   │   │   ├── project_card.dart
│   │   │   ├── project_filter_chips.dart
│   │   │   └── project_list_tile.dart
│   │   ├── task/
│   │   │   ├── task_card.dart
│   │   │   └── task_priority_badge.dart
│   │   └── forms/
│   │       ├── project_form.dart
│   │       ├── task_form.dart
│   │       └── custom_textfield.dart
│   │
│   ├── navigation/
│   │   ├── app_router.dart            # GoRouter configuration
│   │   ├── route_names.dart           # Route path constants
│   │   └── navigation_observer.dart   # Navigation logging
│   │
│   └── styles/                        # Theming
│       ├── app_colors.dart
│       ├── app_text_styles.dart
│       └── app_spacing.dart

└── generated/                         # Freezed, JSON, generated files
    └── ...
```

---

## Technology Stack

### State Management: Riverpod

**Why Riverpod?**
- Type-safe, no service locators
- Built-in dependency injection
- Async support (AsyncValue<T> for loading/error/data states)
- Fast, zero-boilerplate
- Works perfectly with Freezed entities

**Example Provider**:
```dart
// project_providers.dart

final projectRepositoryProvider = Provider((ref) {
  final dioClient = ref.watch(dioClientProvider);
  final database = ref.watch(hiveDatabaseProvider);
  return ProjectRepositoryImpl(
    remoteDatasource: ProjectRemoteDatasource(dioClient),
    localDatasource: ProjectLocalDatasource(database),
  );
});

final projectsProvider = FutureProvider((ref) {
  final repo = ref.watch(projectRepositoryProvider);
  return repo.getAllProjects();
});

final projectDetailProvider = 
    FutureProvider.family((ref, String projectId) {
  final repo = ref.watch(projectRepositoryProvider);
  return repo.getProjectById(projectId);
});
```

### Routing: GoRouter

**Why GoRouter?**
- Official, type-safe routing
- Deep linking built-in
- Declarative route definition
- Works great with Riverpod

**Example Router**:
```dart
// app_router.dart

final appRouterProvider = Provider((ref) {
  return GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const DashboardScreen(),
        routes: [
          GoRoute(
            path: 'projects',
            builder: (context, state) => const ProjectsListScreen(),
            routes: [
              GoRoute(
                path: ':projectId',
                builder: (context, state) {
                  final projectId = state.pathParameters['projectId']!;
                  return ProjectDetailScreen(projectId: projectId);
                },
              ),
            ],
          ),
          GoRoute(
            path: 'tasks',
            builder: (context, state) => const TasksListScreen(),
          ),
        ],
      ),
    ],
  );
});
```

### HTTP Client: Dio

**Features**:
- Interceptors for auth tokens, logging, error handling
- Automatic retry logic
- Request/response transformation
- Timeout handling

**Example Client**:
```dart
// dio_client.dart

class DioClient {
  late final Dio _dio;

  DioClient() {
    _dio = Dio(BaseOptions(
      baseUrl: 'https://api.architecture.dev',
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
    ))
      ..interceptors.add(AuthInterceptor())
      ..interceptors.add(LoggingInterceptor())
      ..interceptors.add(ErrorInterceptor());
  }

  Future<T> get<T>(String path) async {
    try {
      final response = await _dio.get(path);
      return response.data;
    } catch (e) {
      throw NetworkException(e.toString());
    }
  }
}
```

### Database: Drift + Hive

**Drift (SQLite)**: Real relational data (projects, tasks, users, maintenance)
**Hive**: Fast cache layer (app settings, user preferences, temp data)

**Example Drift Code**:
```dart
// app_database.dart
import 'package:drift/drift.dart';

part 'app_database.g.dart';

class Projects extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()();
  TextColumn get type => text()();
  TextColumn get status => text()();
  TextColumn get location => text()();
  RealColumn get budget => real()();
  TextColumn get description => text().nullable()();
  DateTimeColumn get createdAt => dateTime()();
  DateTimeColumn get updatedAt => dateTime()();
}

@DriftDatabase(tables: [Projects, Tasks, Maintenance, Users])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  @override
  int get schemaVersion => 1;
}
```

### Models: Freezed + JSON Serialization

**Why Freezed?**
- Auto-generated equality, toString, copyWith
- Immutable by default
- Works seamlessly with Riverpod and JSON

**Example Model**:
```dart
// project.dart (Freezed entity)
import 'package:freezed_annotation/freezed_annotation.dart';

part 'project.freezed.dart';
part 'project.g.dart';

@freezed
class Project with _$Project {
  const factory Project({
    required String id,
    required String name,
    required String type,
    required ProjectStatus status,
    required String location,
    required double budget,
    String? description,
    required DateTime createdAt,
    required DateTime updatedAt,
  }) = _Project;

  factory Project.fromJson(Map<String, Object?> json) =>
      _$ProjectFromJson(json);
}

enum ProjectStatus {
  @JsonValue('pending')
  pending,
  @JsonValue('in_progress')
  inProgress,
  @JsonValue('completed')
  completed,
}
```

---

## Design Patterns

### 1. Repository Pattern

Separates data access logic from business logic. Each entity has one repository.

```dart
// Domain layer - interface
abstract class ProjectRepository {
  Future<List<Project>> getAllProjects();
  Future<Project> getProjectById(String id);
  Future<Project> createProject(CreateProjectParams params);
  Future<Project> updateProject(String id, UpdateProjectParams params);
  Future<void> deleteProject(String id);
}

// Data layer - implementation
class ProjectRepositoryImpl implements ProjectRepository {
  final ProjectRemoteDatasource _remoteDatasource;
  final ProjectLocalDatasource _localDatasource;

  @override
  Future<List<Project>> getAllProjects() async {
    try {
      final remote = await _remoteDatasource.getProjects();
      await _localDatasource.cacheProjects(remote);
      return remote;
    } catch (e) {
      return _localDatasource.getCachedProjects();
    }
  }
}
```

### 2. Use Cases

Encapsulates specific business operations. One use case = one user action.

```dart
// get_all_projects_usecase.dart
class GetAllProjectsUsecase {
  final ProjectRepository repository;

  GetAllProjectsUsecase(this.repository);

  Future<Either<AppException, List<Project>>> call() async {
    try {
      final projects = await repository.getAllProjects();
      return Right(projects);
    } on NetworkException catch (e) {
      return Left(AppException(message: e.message));
    }
  }
}
```

### 3. Either Pattern

Functional error handling (no exceptions in presentation layer).

```dart
// Either<Left, Right> = Either<Error, Success>
Future<Either<AppException, Project>> createProject(
  CreateProjectParams params,
) async {
  try {
    final project = await _usecase(params);
    return Right(project);
  } on AppException catch (e) {
    return Left(e);
  }
}

// Usage in UI:
result.fold(
  (error) => ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(error.message)),
  ),
  (project) => Navigator.pop(context),
);
```

### 4. Mapper Pattern

Converts between entities, models, and API responses.

```dart
// project_mapper.dart
class ProjectMapper {
  static Project toDomain(ProjectModel model) {
    return Project(
      id: model.id,
      name: model.name,
      type: model.type,
      status: _mapStatus(model.status),
      location: model.location,
      budget: model.budget,
      createdAt: DateTime.parse(model.createdAt),
      updatedAt: DateTime.parse(model.updatedAt),
    );
  }

  static ProjectModel toModel(Project domain) {
    return ProjectModel(
      id: domain.id,
      name: domain.name,
      type: domain.type,
      status: domain.status.toJson(),
      location: domain.location,
      budget: domain.budget,
      createdAt: domain.createdAt.toIso8601String(),
      updatedAt: domain.updatedAt.toIso8601String(),
    );
  }

  static ProjectStatus _mapStatus(String status) {
    return ProjectStatus.values.firstWhere(
      (e) => e.toJson() == status,
      orElse: () => ProjectStatus.pending,
    );
  }
}
```

### 5. StateNotifier for Complex State

Use for screens with multiple state variables.

```dart
// dashboard_provider.dart
class DashboardState {
  final AsyncValue<DashboardData> dashboardData;
  final bool isRefreshing;

  DashboardState({
    required this.dashboardData,
    required this.isRefreshing,
  });
}

class DashboardNotifier extends StateNotifier<DashboardState> {
  final GetDashboardDataUsecase _usecase;

  DashboardNotifier(this._usecase)
      : super(
        DashboardState(
          dashboardData: const AsyncValue.loading(),
          isRefreshing: false,
        ),
      );

  Future<void> loadDashboard() async {
    final result = await _usecase();
    result.fold(
      (error) => state = state.copyWith(
        dashboardData: AsyncValue.error(error, StackTrace.current),
      ),
      (data) => state = state.copyWith(
        dashboardData: AsyncValue.data(data),
      ),
    );
  }
}

final dashboardProvider = StateNotifierProvider<DashboardNotifier, DashboardState>(
  (ref) => DashboardNotifier(ref.watch(getDashboardDataUsecaseProvider)),
);
```

---

## Data Flow Example: Create Project

```
User taps "Create Project" button
      ↓
ProjectDetailScreen.onSavePressed()
      ↓
ref.read(createProjectUsecaseProvider).call(params)
      ↓
CreateProjectUsecase.call()
      ↓
ProjectRepository.createProject()
      ↓
ProjectRemoteDatasource.createProject() [API call]
      ↓
Dio POST /projects { name, type, status, location, budget }
      ↓
Backend returns 201 + new Project
      ↓
ProjectLocalDatasource.cacheProject() [Save to Drift]
      ↓
Return Project entity to UI
      ↓
UI shows success message or navigates back
      ↓
projectsProvider invalidated → list refreshes automatically
```

---

## Exception Handling Strategy

```dart
// core/exceptions/app_exception.dart

abstract class AppException implements Exception {
  final String message;
  AppException({required this.message});
}

class NetworkException extends AppException {
  NetworkException({required String message}) : super(message: message);
}

class CacheException extends AppException {
  CacheException({required String message}) : super(message: message);
}

class ValidationException extends AppException {
  ValidationException({required String message}) : super(message: message);
}

class UnauthorizedException extends AppException {
  UnauthorizedException({String message = 'Unauthorized'})
      : super(message: message);
}

class ServerException extends AppException {
  final int statusCode;
  ServerException({required String message, required this.statusCode})
      : super(message: message);
}
```

---

## Dependency Injection with Riverpod

All external dependencies provided through Riverpod:

```dart
// app_providers.dart

final dioClientProvider = Provider((ref) => DioClient());

final hiveDatabaseProvider = Provider((ref) => HiveDatabase());

final networkInfoProvider = Provider((ref) => NetworkInfo());

// Repository providers
final projectRepositoryProvider = Provider((ref) {
  return ProjectRepositoryImpl(
    remoteDatasource: ProjectRemoteDatasource(ref.watch(dioClientProvider)),
    localDatasource: ProjectLocalDatasource(ref.watch(hiveDatabaseProvider)),
  );
});

// Use case providers
final getAllProjectsUsecaseProvider = Provider((ref) {
  return GetAllProjectsUsecase(ref.watch(projectRepositoryProvider));
});
```

---

## Testing Strategy

### Unit Tests (Domain & Data layers)

```dart
test('GetAllProjectsUsecase returns projects on success', () async {
  // Arrange
  when(mockRepository.getAllProjects())
      .thenAnswer((_) async => mockProjects);

  // Act
  final result = await usecase();

  // Assert
  expect(result, isA<Right>());
  result.fold(
    (error) => fail('Expected Right but got Left'),
    (projects) => expect(projects.length, 2),
  );
});
```

### Widget Tests (Presentation layer)

```dart
testWidgets('ProjectsListScreen displays projects', (WidgetTester tester) async {
  await tester.pumpWidget(
    ProviderContainer(
      overrides: [
        projectsProvider.overrideWithValue(
          AsyncValue.data(mockProjects),
        ),
      ],
      child: const MaterialApp(home: ProjectsListScreen()),
    ).build(),
  );

  expect(find.byType(ProjectCard), findsWidgets);
});
```

---

## Performance Optimization

1. **Image Caching**: Use `CachedNetworkImage` or Firebase Storage
2. **Pagination**: Load 20 items per page, lazy load on scroll
3. **Debouncing**: Delay API calls for search (200ms)
4. **Freezed Equality**: Automatic memoization prevents rebuilds
5. **Const Widgets**: Use `const` for static widgets
6. **BuildContext Extensions**: Avoid passing context through multiple layers

---
