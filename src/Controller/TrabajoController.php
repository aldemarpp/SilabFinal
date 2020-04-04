<?php

namespace App\Controller;
use App\Entity\Trabajo;
use App\Repository\TrabajoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/trabajo", name="api_trabajo")
 */
class TrabajoController extends AbstractController
{
    private $entityManager;
    private $trabajoRepository;
 
    public function __construct(EntityManagerInterface $entityManager, TrabajoRepository $trabajoRepository)
    {
        $this->entityManager = $entityManager;
        $this->trabajoRepository = $trabajoRepository;
    }
    /**
     * @Route("/read", name="api_trabajo_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->trabajoRepository->findAll();
        $arrayOfTodos = [];
        foreach ($todos as $todo){
            $arrayOfTodos[] = $todo->toArray();
        }
        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/create", name="api_trabajo_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $todo = new Trabajo();
 
        $todo->setRegistro($content->registro);
        $todo->setDescripcion($content->descripcion);

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
     * @Route("/update/{id}", name="api_trabajo_update", methods={"PUT"})
     * @param Request $request
     * @param Trabajo $todo
     * @return JsonResponse
     */
    public function update(Request $request, Trabajo $todo)
    {
        $content = json_decode($request->getContent());
 
        if ($todo->getRegistro() === $content->registro && $todo->getDescripcion() === $content->descripcion) {
            return $this->json([
                'message' => 'No hubo cambios'
            ]);
        }

        $todo->setRegistro($content->registro);
        $todo->setDescripcion($content->descripcion);
 
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
     * @Route("/delete/{id}", name="api_trabajo_delete")
     * @param Trabajo $todo
     * @return JsonResponse
     */
    public function delete(Trabajo $todo)
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
