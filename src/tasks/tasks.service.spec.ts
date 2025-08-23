import { Test } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
});

const mockUser = {
    id: '1',
    username: 'Ofir',
    password: 'password',
    tasks: []
}

describe('TasksService', () => {
    let tasksService: TaskService;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TaskService,
                { provide: TasksRepository, useFactory: mockTasksRepository }
            ],
        }).compile();

        tasksService = module.get(TaskService);
        tasksRepository = module.get(TasksRepository);
    });

    describe('getTasks', () => {
        it('calls TasksRepository and returns the result', async () => {
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = await tasksService.getTasks(null, mockUser);
            expect(result).toEqual('someValue');
        });
    });

    describe('getTaskById', () => {
        it('calls TasksRepository.findOne and returns the result', async () => {
            const mockTask = {
                title: 'Test Task',
                description: 'Test Description',
                id: 'someId',
                status: TaskStatus.OPEN,
            };

            tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('someId', mockUser);
            expect(result).toEqual(mockTask);
        });

        it('calls TasksRepository.findOne and handles errors', async () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow();
        });
    });
});