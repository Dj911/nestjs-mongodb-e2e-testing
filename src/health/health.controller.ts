import { Controller, Get } from "@nestjs/common";
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from "@nestjs/terminus";

@Controller('/health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private readonly disk: DiskHealthIndicator,
        private memory: MemoryHealthIndicator,
    ) { }

    @Get('/disk')
    @HealthCheck()
    memoryHealth() {
        return this.health.check([
            () => this.disk.checkStorage(
                'storage',
                // would be unhealthy in case the path of the project would exceed 250GB.
                { path: '/', threshold: 250 * 1024 * 1024 * 1024, }
            )
        ]);
    }

    @Get('/memory')
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
        ]);
    }

}