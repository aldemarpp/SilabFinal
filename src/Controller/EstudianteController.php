<?php

namespace App\Controller;
use App\Entity\Estudiante;
use App\Repository\EstudianteRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/estudiante", name="api_estudiante")
 */
class EstudianteController extends AbstractController
{
    private $entityManager;
    private $estudianteRepository;
 
    public function __construct(EntityManagerInterface $entityManager, EstudianteRepository $estudianteRepository)
    {
        $this->entityManager = $entityManager;
        $this->estudianteRepository = $estudianteRepository;
    }
    /**
     * @Route("/read", name="api_estudiante_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->estudianteRepository->findAll();
        $arrayOfTodos = [];
        foreach ($todos as $todo){
            $arrayOfTodos[] = $todo->toArray();
        }
        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/create", name="api_estudiante_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $todo = new Estudiante();
 
        $todo->setCodigo($content->codigo);
        $todo->setNombre($content->nombre);
        $todo->setPrograma($content->programa);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
            return $this->json([
                'todo' => $todo->toArray(),
                ]);
                
        } catch (Exception $exception) {
            //error                
 
        }
    }

    /**
     * @Route("/update/{id}", name="api_estudiante_update", methods={"PUT"})
     * @param Request $request
     * @param Estudiante $todo
     * @return JsonResponse
     */
    public function update(Request $request, Estudiante $todo)
    {
        $content = json_decode($request->getContent());
 
        if ($todo->getCodigo() === $content->codigo && $todo->getNombre() === $content->nombre && $todo->getPrograma() === $content->programa) {
            return $this->json([
                'message' => 'No hubo cambios'
            ]);
        }

        $todo->setCodigo($content->codigo);
        $todo->setNombre($content->nombre);
        $todo->setPrograma($content->programa);
 
        try {
            $this->entityManager->flush();
        } catch (Exception $exception) {
            //error
        }
 
        return $this->json([
            'todo'    => $todo->toArray(),
            'message' => 'todo ha sido actualizado'
        ]);
 
    }

    /**
     * @Route("/delete/{id}", name="api_estudiante_delete")
     * @param Estudiante $todo
     * @return JsonResponse
     */
    public function delete(Estudiante $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            //error
        }
 
        return $this->json([
            'message' => 'todo ha sido eliminado'
        ]);
 
    }




    
  
}
