import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swaggerOptions(app, cfg) {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Optivus')
    .setDescription('This is my custom crm')
    .setVersion(`${cfg.version}`)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(`${cfg.version}/docs`, app, document);
}
